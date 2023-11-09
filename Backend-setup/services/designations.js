const { designations: DesignationsModel , sequelize} = require('../database');

const uuidv1 = require('uuid/v1');

const save = async(payload) => {
    try{
        const { desg_name, ...body } = payload;

        const public_id = uuidv1();
        const concurrency_stamp = uuidv1();

        const doc = {
            public_id,
            desg_name,
            ...body,
            concurrency_stamp,
        }

        const transaction = await sequelize.transaction();
        const isExist = await DesignationsModel.findOne({
            where: { desg_name: desg_name },
            transaction
        })

        if(isExist) {
            await transaction.rollback();
            return { errors: [ { name: "desg_name", message: "duplicate entry." }]}
        }
    
        const designations = await DesignationsModel.create(doc);
        
        return { doc: { public_id }}
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({ message: "error in services try block", error });
    }
}

module.exports = {
    save,
}