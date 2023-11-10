const { Branches: BranchesService } = require("../services");
const {
  saveBranch: saveBranchSchema,
  updateBranch: updateBranchesSchema,
  getBranchList: getBranchesListSchema,
  updateBranchStatus: updateBranchesStatusSchema,
} = require("../dto-schemas");
const { branches: BranchesModel, sequelize } = require("../database");
const Validator = require('../utils/validator');
const Helper = require('../utils/helper');

const save = async (req, res) => {
  try {
    const { body } = req;
    const data = { ...body };

    const { errors } = Validator.isSchemaValid({ data, schema: saveBranchSchema });
    if (errors) {
      return res.status(400).json({ message: "Error in dto-schemas" });
    }
    const { errors: error, doc } = await BranchesService.save(data);

    if (doc) {
      const { public_id } = doc;

      res.setHeader('public-id', public_id);
      res.setHeader('message', 'save Successfully');

      return res.status(201).json({ message: "Post request was successful" });
    }

    return res.status(500).json({ message: "field-validation" , error });
  } catch (error) {
    console.log("error in controller try block" , error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const {
      body,
      params: { publicId },
      user: { userId: updatedBy },
      headers: { "x-coreplatform-concurrencystamp": concurrencyStamp },
    } = req;

    const data = {
      ...body,
      publicId,
      concurrencyStamp,
      updatedBy,
    };

    const { errors } = Validator.isSchemaValid({
      data,
      schema: updateBranchesSchema,
    });

    if (errors) {
      return res.badRequest("field-validation", errors);
    }

    const {
      errors: error,
      concurrencyError,
      doc,
    } = await BranchesService.update(data);

    if (concurrencyError) {
      return res.concurrencyError();
    }

    if (doc) {
      const { concurrencyStamp: stamp } = doc;

      res.setHeader("x-coreplatform-concurrencystamp", stamp);
      res.setHeader("message", "successfully updated.");

      return res.updated();
    }

    return res.badRequest("field-validation", error);
  } catch (error) {
    return res.serverError(error);
  }
};

const getList = async (req, res) => {
  try {
    const {
      user: { role },
      query: {
        pageSize: pageSizeString,
        pageNumber: pageNumberString,
        ...query
      },
    } = req;

    const pageNumber = parseInt(pageNumberString || 1);
    const pageSize = parseInt(pageSizeString || 10);

    const data = {
      ...query,
      role,
      pageNumber,
      pageSize,
    };

    const { errors } = Validator.isSchemaValid({
      data,
      schema: getBranchesListSchema,
    });

    if (errors) {
      return res.badRequest("field-validation", errors);
    }

    const { count, doc } = await BranchesService.getList(data);

    res.setHeader("x-coreplatform-paging-limit", pageSize);
    res.setHeader("x-coreplatform-total-records", count);

    return res.getRequest(doc);
  } catch (error) {
    return res.serverError(error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const {
      body,
      params: { publicId },
      user: { userId },
      headers: { "x-coreplatform-concurrencystamp": concurrencyStamp },
    } = req;

    const data = {
      ...body,
      publicId,
      concurrencyStamp,
      updatedBy: userId,
    };

    const { errors } = Validator.isSchemaValid({
      data,
      schema: updateBranchesStatusSchema,
    });

    if (errors) {
      return res.badRequest("field-validation", errors);
    }

    const { concurrencyError, doc } = await BranchesService.updateStatus(data);

    if (concurrencyError) {
      return res.concurrencyError();
    }

    if (doc) {
      const { concurrencyStamp: stamp } = doc;

      res.setHeader("x-coreplatform-concurrencystamp", stamp);
      res.setHeader("message", "successfully updated.");

      return res.updated();
    }

    return res.notFound();
  } catch (error) {
    return res.serverError(error);
  }
};

const getListStatus = async (req, res) => {
  try {
    const {
      user: { role },
      query: {
        pageSize: pageSizeString,
        pageNumber: pageNumberString,
        ...query
      },
    } = req;

    const pageNumber = parseInt(pageNumberString || 1);
    const pageSize = parseInt(pageSizeString || 10);

    const data = {
      ...query,
      role,
      pageNumber,
      pageSize,
    };

    const { count, doc } = await BranchesService.getListStatus(data);

    return res.getRequest(doc);
  } catch (error) {
    return res.serverError(error);
  }
};

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
