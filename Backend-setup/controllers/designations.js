const { designations : DesignationsService } = require('../services');
const { saveDesignations : saveDesignationsSchema } = require('../dto-schemas');

const Validator = require('../utils/validator');

const save = async (req, res) => {
    try{
        const { body } = req;
        const data = {...body}
    
        const { errors } = Validator.isSchemaValid({ data, schema: saveDesignationsSchema})
        if(errors) {
            return res.status(400).json({ message: "error in dto-schema validations", errors });
        }
    
        const { errors: error , doc } = await DesignationsService.save(data);
    
        if(doc) {
            return res.status(201).json({ message: "designations created succesfully"})
        }
    
        return res.status(500).json({ message: "error in controller try block", error });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server Error", error })
    }
}

module.exports = {
    save
}