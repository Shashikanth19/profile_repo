const { designations: DesignationsModel, sequelize } = require("../database");

const uuidv1 = require("uuid/v1");

const save = async (payload) => {
  try {
    const { desg_name, ...body } = payload;

    const public_id = uuidv1();
    const concurrency_stamp = uuidv1();

    const doc = {
      public_id,
      desg_name,
      ...body,
      concurrency_stamp,
    };

    const transaction = await sequelize.transaction();
    const isExist = await DesignationsModel.findOne({
      where: { desg_name: desg_name },
      transaction,
    });

    if (isExist) {
      await transaction.rollback();
      return { errors: [{ name: "desg_name", message: "duplicate entry." }] };
    }

    const designations = await DesignationsModel.create(doc);

    return { doc: { public_id } };
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
    const { public_id, ...data } = payload;
    const { concurrency_stamp } = data;

    const transaction = await sequelize.transaction();

    const response = await DesignationsModel.findOne({
      where: { public_id: public_id },
      transaction,
    });

    if (response) {
      const { concurrency_stamp: stamp } = response;

      if (concurrency_stamp === stamp) {
        const newConcurrencyStamp = uuidv1();
        const doc = {
          ...payload,
          concurrency_stamp: newConcurrencyStamp,
        };

        const updatedData = await DesignationsModel.update(doc, {
          where: { public_id: public_id },
          transaction,
        });

        await transaction.commit();

        return { doc: { concurrency_stamp: newConcurrencyStamp } };
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
  const { public_id, ...data } = payload;
  const { concurrency_stamp } = data;

  const transaction = await sequelize.transaction();

  try {
    const response = await DesignationsModel.findOne({
      where: { public_id: public_id },
      transaction,
    });

    if (response) {
      const { concurrency_stamp: stamp } = response;

      if (concurrency_stamp === stamp) {
        const newConcurrencyStamp = uuidv1();

        const doc = {
          ...payload,
          concurrency_stamp: newConcurrencyStamp,
        };

        await DesignationsModel.update(doc, {
          where: { public_id: public_id },
          transaction,
        });

        await transaction.commit();

        return { doc: { concurrency_stamp: newConcurrencyStamp }}
      }
      await transaction.rollback();

      return { concurrencyError: { message: "inValid concurrency stamp" } };
    }
    return {}
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
