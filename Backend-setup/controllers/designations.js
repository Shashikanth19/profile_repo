const { designations: DesignationsService } = require("../services");
const {
  saveDesignations: saveDesignationsSchema,
  getDesignationsList: getDesignationsListSchema,
  updateDesignations: updateDesignationsSchema,
  updateDesignationsStatus: updateDesignationsStatusSchema,
} = require("../dto-schemas");

const Validator = require("../utils/validator");

const save = async (req, res) => {
  try {
    const { body } = req;
    const data = { ...body };

    const { errors } = Validator.isSchemaValid({
      data,
      schema: saveDesignationsSchema,
    });
    if (errors) {
      return res
        .status(400)
        .json({ message: "error in dto-schema validations", errors });
    }

    const { errors: error, doc } = await DesignationsService.save(data);

    if (doc) {
      return res
        .status(201)
        .json({ message: "designations created succesfully" });
    }

    return res
      .status(500)
      .json({ message: "error in controller try block", error });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error", error });
  }
};

const getList = async (req, res) => {
  try {
    // const { errors } = Validator.isSchemaValid({ schema: getDesignationsListSchema});

    // if(errors) {
    //   return res.status(400).json({ message: "field-validation", errors})
    // }

    const { errors: error, doc } = await DesignationsService.getList();

    if (doc) {
      return res.status(200).json({ message: "Success", data: doc });
    }

    return res
      .status(500)
      .json({ message: "error in controller block", error });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in controller try block", error });
  }
};

const update = async (req, res) => {
  try {
    const {
      body,
      params: { publicId },
      headers: { "x-coreplatform-concurrencystamp": concurrencyStamp },
    } = req;

    const data = {
      ...body,
      publicId,
      concurrencyStamp,
    };

       const { errors } = Validator.isSchemaValid({ data, schema: updateDesignationsSchema });

       if(errors) {
        return res.status(400).json({ message: "field-validation error", errors });
       }

    const {
      errors: error,
      concurrencyError,
      doc,
    } = await DesignationsService.update(data);

    if (concurrencyError) {
      return res
        .status(412)
        .json({ message: "concurrency-error", concurrencyError });
    }

    if (doc) {
      return res.status(200).json({ message: "update succesfull", data: doc });
    }

    return res
      .status(500)
      .json({ message: "error in controlller try block", error });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in controller catch block" });
  }
};

const updateStatus = async (req, res) => {
  try{
    const { body, params : { publicId }, headers: {"x-coreplatform-concurrencystamp": concurrencyStamp } } = req;

    const data = {
      ...body,
      publicId,
      concurrencyStamp
    }

    const { errors } = Validator.isSchemaValid({ data, schema: updateDesignationsStatusSchema })
    if(errors){
      return res.status(400).json({ message: "field-validatios error", errors })
    }

    const { concurrencyError , doc } = await DesignationsService.updateStatus(data);

    if(concurrencyError){
      return res.status(412).json({ message: "invalid concurrency stamp" });
    }

    if(doc) {
      return res.status(200).json({ message: "status updated succesfully", data: doc})
    }

    return res.status(500).json({ message : "error in controller try block" });
  }
  catch(error) {
    console.log(error);
    return res.status(500).json({ message: "error in controller catch block"});
  }

}

module.exports = {
  save,
  getList,
  update,
  updateStatus,

};
