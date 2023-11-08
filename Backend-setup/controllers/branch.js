const { Branches: BranchesService } = require("../services");
const {
  saveBranch: saveBranchSchema, updateBranch: updateBranchesSchema,
  getBranchList: getBranchesListSchema, updateBranchStatus: updateBranchesStatusSchema
} = require('../dto-schemas');
const { branches: BranchesModel, sequelize } = require("../database");
// const Validator = require('../utils/validator');
// const Helper = require('../utils/helper');
/**
 * @swagger
 * tags:
 *   name: branches
 *   description: Operations on branches
 */

/**
 * @swagger
 * /branch:
 *   post:
 *     security:
 *       - Bearer: []
 *     summary: Add a new branch
 *     tags: [branches]
 *     description: Add a new branch to the database
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Authorization token
 *       - in: formData
 *         name: branch_name
 *         required: true
 *         type: string
 *         description: Branch Name
 *       - in: formData
 *         name: branch_code
 *         required: true
 *         type: string
 *         description: Branch Code
 *       - in: formData
 *         name: branch_description
 *         required: true
 *         type: string
 *         description: Branch Description
 *       - in: formData
 *         name: status
 *         enum:
 *           - active
 *           - inactive
 *         required: false
 *         description: status for the branch
 *     produces:
 *       - application/x-www-form-urlencoded
 *     responses:
 *       200:
 *         description: Branch added successfully
 *       400:
 *         description: Invalid status value
 */

const save = async (req, res) => {
 
  try {
    const { body, user: { userId } } = req;
    const data = { ...body, createdBy: userId };
    console.log("save branch before");
    const { errors } = Validator.isSchemaValid({ data, schema: saveBranchSchema });
    console.log("save branch after");
    if (errors) {
      return res.badRequest('field-validation', errors);
    }
    const { errors: error, doc } = await BranchesService.save(data);

    if (doc) {
      const { publicId } = doc;

      res.setHeader('public-id', publicId);
      res.setHeader('message', 'save Successfully');

      return res.postRequest();
    }

    return res.badRequest('field-validation', error);
  } catch (error) {
    return res.serverError(error);
  }
};
/**
 * @swagger
 * /branch/{publicId}:
 *   patch:
 *     security:
 *       - Bearer: []
 *     summary: Update a branch by ID
 *     tags: [branches]
 *     description: Update a branch's information by its public ID
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Authorization token
 *       - in: path
 *         name: publicId
 *         required: true
 *         type: string
 *         description: Public ID of the branch to be updated
 *       - in: formData
 *         name: branch_name
 *         required: false
 *         type: string
 *         description: Updated branch name
 *       - in: formData
 *         name: branch_code
 *         required: false
 *         type: string
 *         description: Updated branch code
 *       - in: formData
 *         name: branch_description
 *         required: false
 *         type: string
 *         description: Updated branch description
 *     produces:
 *       - application/x-www-form-urlencoded
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       400:
 *         description: Invalid status value
 */

const update = async (req, res) => {
  try {
    const {
      body, params: { publicId }, user: { userId: updatedBy }, headers: { 'x-coreplatform-concurrencystamp': concurrencyStamp },
    } = req;

    const data = {
      ...body, publicId, concurrencyStamp, updatedBy,
    };

    const { errors } = Validator.isSchemaValid({ data, schema: updateBranchesSchema });

    if (errors) {
      return res.badRequest('field-validation', errors);
    }

    const { errors: error, concurrencyError, doc } = await BranchesService.update(data);

    if (concurrencyError) {
      return res.concurrencyError();
    }

    if (doc) {
      const { concurrencyStamp: stamp } = doc;

      res.setHeader('x-coreplatform-concurrencystamp', stamp);
      res.setHeader('message', 'successfully updated.');

      return res.updated();
    }

    return res.badRequest('field-validation', error);
  } catch (error) {
    return res.serverError(error);
  }
};
/**
 * @swagger
 * /branch:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Get a list of branches
 *     tags: [branches]
 *     description: Retrieve a list of branches
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of branches retrieved successfully
 *       401:
 *         description: Unauthorized
 */

const getList = async (req, res) => {
  try {
    const { user: { role }, query: { pageSize: pageSizeString, pageNumber: pageNumberString, ...query } } = req;

    const pageNumber = parseInt(pageNumberString || 1);
    const pageSize = parseInt(pageSizeString || 10);

    const data = {
      ...query, role, pageNumber, pageSize,
    };

    const { errors } = Validator.isSchemaValid({ data, schema: getBranchesListSchema });

    if (errors) {
      return res.badRequest('field-validation', errors);
    }

    const { count, doc } = await BranchesService.getList(data);

    res.setHeader('x-coreplatform-paging-limit', pageSize);
    res.setHeader('x-coreplatform-total-records', count);

    return res.getRequest(doc);
  } catch (error) {
    return res.serverError(error);
  }
};



/**
 * @swagger
 * /branch-status-update/{publicId}:
 *   patch:
 *     security:
 *       - Bearer: []
 *     summary: Update the status of a branch by ID
 *     tags: [branches]
 *     description: Update the status of a branch by its public ID
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Authorization token
 *       - in: path
 *         name: publicId
 *         required: true
 *         type: string
 *         description: Public ID of the branch to update the status
 *       - in: formData
 *         name: status
 *         enum:
 *           - active
 *           - inactive
 *         required: false
 *         description: Updated status for the branch
 *     produces:
 *       - application/x-www-form-urlencoded
 *     responses:
 *       200:
 *         description: Branch status updated successfully
 *       400:
 *         description: Invalid status value
 */

const updateStatus = async (req, res) => {
  try {
    const {
      body, params: { publicId }, user: { userId }, headers: { 'x-coreplatform-concurrencystamp': concurrencyStamp },
    } = req;

    const data = {
      ...body, publicId, concurrencyStamp, updatedBy: userId,
    };

    const { errors } = Validator.isSchemaValid({ data, schema: updateBranchesStatusSchema });

    if (errors) {
      return res.badRequest('field-validation', errors);
    }

    const { concurrencyError, doc } = await BranchesService.updateStatus(data);

    if (concurrencyError) {
      return res.concurrencyError();
    }

    if (doc) {
      const { concurrencyStamp: stamp } = doc;

      res.setHeader('x-coreplatform-concurrencystamp', stamp);
      res.setHeader('message', 'successfully updated.');

      return res.updated();
    }

    return res.notFound();
  } catch (error) {
    return res.serverError(error);
  }
};
/**
 * @swagger
 * /branch-status:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Get a list of branches with status
 *     tags: [branches]
 *     description: Retrieve a list of branches along with their status
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of branches with status retrieved successfully
 *       401:
 *         description: Unauthorized
 */

const getListStatus = async (req, res) => {
  try {
    const { user: { role }, query: { pageSize: pageSizeString, pageNumber: pageNumberString, ...query } } = req;

    const pageNumber = parseInt(pageNumberString || 1);
    const pageSize = parseInt(pageSizeString || 10);

    const data = {
      ...query, role, pageNumber, pageSize,
    };
    
   
    const {count,doc} = await BranchesService.getListStatus(data);
    

    return res.getRequest(doc);
  } catch (error) {
    return res.serverError(error);
  }
};
/**
 * @swagger
 * /branch-stats-by-field-name/{fieldname}:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Retrieve statistics for branches based on a specific field name
 *     tags: [branches]
 *     description: Retrieve statistics for branches based on a specific field name
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Authorization token
 *       - in: path
 *         name: fieldname
 *         required: true
 *         type: string
 *         description: Field name for which statistics are needed
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Branch statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 */

const getStatsByFieldName = async (req, res) => {
  try {
    const {
      user: { role },
      params: { fieldname },
      query: {
        pageSize: pageSizeString,
        pageNumber: pageNumberString,
        ...query
      },
    } = req;

    const allowedFieldNames = Object.keys(BranchesModel.rawAttributes);

    const excludedFields = [
      "id",
      "public_id",
      "concurrency_stamp",
      "created_by",
      "updated_by",
      "created_at",
      "updated_at",
    ];

    const snakeCaseFieldname = Helper.convertCamelToSnake(fieldname);

    const filteredFieldNames = allowedFieldNames.filter(
      (fieldName) => !excludedFields.includes(fieldName)
    );

    if (!filteredFieldNames.includes(snakeCaseFieldname)) {
      const errorResponse = {
        status: "error",
        message: "Invalid fieldname. Use one of the allowed field names.",
      };
      return res.status(400).json(errorResponse);
    }

    const pageNumber = parseInt(pageNumberString || 1);
    const pageSize = parseInt(pageSizeString || 10);

    const data = {
      ...query,
      role,
      pageNumber,
      pageSize,
    };
console.log(snakeCaseFieldname);
    const { count, doc } = await BranchesService.getStatsByFieldName(
      data,
      snakeCaseFieldname
    );

    const successResponse = {
      status: "success",
      data: doc,
    };
    return res.status(200).json(successResponse);
  } catch (error) {
    const errorResponse = {
      status: "error",
      message: "An error occurred while processing the request.",
    };
    return res.status(500).json(errorResponse);
  }
};

module.exports = {
  save,
  update,
  getList,
  updateStatus,
  getListStatus,
  getStatsByFieldName,
};
