const { designations: DesignationsModel, sequelize } = require("../database");

const uuidv1 = require("uuid/v1");
const Helper = require("../utils/helper");

const save = async (payload) => {
  try {
    const { desgName, ...body } = payload;

    const publicId = uuidv1();
    const concurrencyStamp = uuidv1();

    const doc = {
      publicId,
      desgName,
      ...body,
      concurrencyStamp,
    };

    const transaction = await sequelize.transaction();
    const isExist = await DesignationsModel.findOne({
      where: { desg_name: desgName },
      transaction,
    });

    if (isExist) {
      await transaction.rollback();
      return { errors: [{ name: "desgName", message: "duplicate entry." }] };
    }

    const designations = await DesignationsModel.create({
      ...Helper.convertCamelToSnake(doc),
      transaction,
    });

    return { doc: { publicId } };
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error in services try block", error });
  }
};

const getList = async (payload) => {
  try {
    const doc = await DesignationsModel.findAndCountAll();

    return { doc };
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "error in services", error });
  }
};

const update = async (payload) => {
  try {
    const { publicId, ...data } = payload;
    const { concurrencyStamp } = data;

    const transaction = await sequelize.transaction();

    const response = await DesignationsModel.findOne({
      where: { public_id: publicId },
      transaction,
    });

    if (response) {
      const { concurrency_stamp: stamp } = response;

      if (concurrencyStamp === stamp) {
        const newConcurrencyStamp = uuidv1();
        const doc = {
          ...Helper.convertCamelToSnake(payload),
          concurrency_stamp: newConcurrencyStamp,
        };

        const updatedData = await DesignationsModel.update(doc, {
          where: { public_id: publicId },
          transaction,
        });

        await transaction.commit();

        return { doc: { concurrencyStamp: newConcurrencyStamp } };
      } else {
        await transaction.rollback();
        return { concurrencyError: { message: "invalid concurrecy stamp" } };
      }
    }

    return {};
  } catch (error) {
    console.log(error);
    await transaction.rollback();

    return {
      errors: [{ name: "transaction", message: "transaction failed " }],
    };
  }
};

const updateStatus = async (payload) => {
  const { publicId, ...data } = payload;
  const { concurrencyStamp } = data;

  const transaction = await sequelize.transaction();

  try {
    const response = await DesignationsModel.findOne({
      where: { public_id: publicId },
      transaction,
    });

    if (response) {
      const { concurrency_stamp: stamp } = response;

      if (concurrencyStamp === stamp) {
        const newConcurrencyStamp = uuidv1();

        const doc = {
          ...Helper.convertCamelToSnake(payload),
          concurrency_stamp: newConcurrencyStamp,
        };

        await DesignationsModel.update(doc, {
          where: { public_id: publicId },
          transaction,
        });

        await transaction.commit();

        return { doc: { concurrencyStamp: newConcurrencyStamp } };
      }
      await transaction.rollback();

      return { concurrencyError: { message: "inValid concurrency stamp" } };
    }
    return {};
  } catch (error) {
    console.log(error);

    await transaction.rollback();
    return { errors: [{ name: "transaction", message: "transaction failed" }] };
  }
};

module.exports = {
  save,
  getList,
  update,
  updateStatus,
};
