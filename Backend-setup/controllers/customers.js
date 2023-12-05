const { customers: CustomersService } = require("../services");
const {
  saveCustomers: saveCustomersSchema,
  updateCustomers: updateCustomersSchema,
  getCustomersList: getCustomersListSchema,
  updateCustomersStatus: updateCustomersStatusSchema,
  getCustomerStatsByStatus: getCustomerStatsByStatusSchema
} = require("../dto-schemas");
const Validator = require("../utils/validator");

const save = async (req, res) => {
  try {
    /** Destructure request parameters */
    const {
      body,
      user: { userId },
    } = req;

    /** Create data object with additional createdBy information */
    const data = { ...body, createdBy: userId };

    /** Validate the data against the saveCustomersSchema using Validator */
    const { errors } = Validator.isSchemaValid({
      data,
      schema: saveCustomersSchema,
    });

    /** If validation errors are present, send a bad request response with errors */
    if (errors) {
      return res.badRequest("field-validation", errors);
    }

    /** Call CustomersService.save to save the data */
    const { errors: serviceError, doc } = await CustomersService.save(data);

    /** If the document is saved successfully, set headers and send a success response */
    if (doc) {
      const { publicId } = doc;

      res.setHeader("public-id", publicId);
      res.setHeader("message", "save Successfully");

      return res.postRequest();
    }

    /** If there are errors from the service, send a bad request response with errors */
    return res.badRequest("field-validation", serviceError);
  } catch (error) {
    return res.serverError(error);
  }
};


const update = async (req, res) => {
  try {
    /** Destructure request parameters */
    const {
      body,
      params: { publicId },
      user: { userId: updatedBy },
      headers: { "x-coreplatform-concurrencystamp": concurrencyStamp },
    } = req;

    /** Create data object with additional information for update */
    const data = {
      ...body,
      publicId,
      concurrencyStamp,
      updatedBy,
    };

    /** Validate the data against the updateCustomersSchema using Validator */
    const { errors } = Validator.isSchemaValid({
      data,
      schema: updateCustomersSchema,
    });

    /** If validation errors are present, send a bad request response with errors */
    if (errors) {
      return res.badRequest("field-validation", errors);
    }

    /** Call CustomersService.update to update the data */
    const {
      errors: serviceError,
      concurrencyError,
      doc,
    } = await CustomersService.update(data);

    /** If there is a concurrency error, send a concurrency error response */
    if (concurrencyError) {
      return res.concurrencyError();
    }

    /** If the document is updated successfully, set headers and send an updated response */
    if (doc) {
      const { concurrencyStamp: stamp } = doc;

      res.setHeader("x-coreplatform-concurrencystamp", stamp);
      res.setHeader("message", "Successfully updated.");

      return res.updated();
    }

    /** If there are errors from the service, send a bad request response with errors */
    return res.badRequest("field-validation", serviceError);
  } catch (error) {
    return res.serverError(error);
  }
};


const getList = async (req, res) => {
  try {
    /** Destructure request parameters */
    const {
      user: { role },
      query: { pageSize: pageSizeString, pageNumber: pageNumberString, ...query },
    } = req;

    /** Parse and set default values for pageSize and pageNumber */
    const pageNumber = parseInt(pageNumberString || 1);
    const pageSize = parseInt(pageSizeString || 10);

    /** Create data object with additional information for getting the list */
    const data = {
      ...query,
      role,
      pageNumber,
      pageSize,
    };

    /** Validate the data against the getCustomersListSchema using Validator */
    const { errors } = Validator.isSchemaValid({
      data,
      schema: getCustomersListSchema,
    });

    /** If validation errors are present, send a bad request response with errors */
    if (errors) {
      return res.badRequest("field-validation", errors);
    }

    /** Call CustomersService.getList to retrieve the list of Customers */
    const { count, doc } = await CustomersService.getList(data);

    /** Set headers for pagination information */
    res.setHeader("x-coreplatform-paging-limit", pageSize);
    res.setHeader("x-coreplatform-total-records", count);

    /** Send a success response with the retrieved document */
    return res.getRequest(doc);
  } catch (error) {
    return res.serverError(error);
  }
};

const updateStatus = async (req, res) => {
  try {
    /** Destructure request parameters */
    const {
      body,
      params: { publicId },
      user: { userId },
      headers: { "x-coreplatform-concurrencystamp": concurrencyStamp },
    } = req;

    /** Create data object with additional information for updating status */
    const data = {
      ...body,
      publicId,
      concurrencyStamp,
      updatedBy: userId,
    };

    /** Validate the data against the updateCustomersStatusSchema using Validator */
    const { errors } = Validator.isSchemaValid({
      data,
      schema: updateCustomersStatusSchema,
    });

    /** If validation errors are present, send a bad request response with errors */
    if (errors) {
      return res.badRequest("field-validation", errors);
    }

    /** Call CustomersService.updateStatus to update the status */
    const { concurrencyError, doc } = await CustomersService.updateStatus(data);

    /** If there is a concurrency error, send a concurrency error response */
    if (concurrencyError) {
      return res.concurrencyError();
    }

    /** If the status is updated successfully, set headers and send an updated response */
    if (doc) {
      const { concurrencyStamp: stamp } = doc;

      res.setHeader("x-coreplatform-concurrencystamp", stamp);
      res.setHeader("message", "Successfully updated.");

      return res.updated();
    }

    /** If no document is found, send a not found response */
    return res.notFound();
  } catch (error) {
    return res.serverError(error);
  }
};

const getCustomerByMobile = async (req, res) => {
  try {
    const { params: { mobileNo } } = req;

    const data = { mobileNo };

    const { errors, doc } = await CustomersService.getCustomerByMobile(data);

    if(errors) {
      return res.badRequest("mobile-number-validation", [{"name": "Validation", "message": "No Data found with given Mobile Number"}]);
    }

    return res.getRequest(doc);
  } catch (error) {
    return res.serverError(error);
  }
};

const getCustomerStatsByStatus = async (req, res) => {
  try {
    const { params: { status } } = req;

    const data = { status };

    const { errors } = Validator.isSchemaValid({ data, schema:getCustomerStatsByStatusSchema });

    if (errors) {
      return res.badRequest('field-validation', errors);
    }

    /** Query the database to retrieve document statistics by status */
    const { doc } = await CustomersService.getCustomerStatsByStatus(data);

    if (doc.length === 0) {
      return res.getRequest("No data found in the database");
    } else {
      return res.getRequest(doc);
    }
  } catch (error) {
    console.error(error);
    return res.serverError(error);
  }
};

module.exports = {
  save,
  update,
  getList,
  updateStatus,
  getCustomerByMobile,
  getCustomerStatsByStatus,

};
