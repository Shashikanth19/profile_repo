const { branches: BranchesModel, sequelize } = require("../database");
const uuidV1 = require("uuid/v1");
const Helper = require("../utils/helper");

const save = async (payload) => {
  const { branch_name, branch_code, branch_description, status } = payload;

  const public_id = uuidV1();
  const concurrency_stamp = uuidV1();
  const doc = {
    public_id,
    branch_name,
    branch_code,
    branch_description,
    status,

    concurrency_stamp,
  };

  const transaction = await sequelize.transaction();
  const isExist = await BranchesModel.findOne({
    where: { branch_code: branch_code },
    transaction,
  });
  if (isExist) {
    await transaction.rollback();

    return { errors: [{ name: "branch_code", message: "duplicate entry." }] };
  }
  const Branchs = await BranchesModel.create(doc);

  return { doc: { public_id } };
};

const update = async (payload) => {
  const { publicId, branchName, branchCode, branchDescription, ...data } =
    payload;
  const { concurrencyStamp, updatedBy } = data;

  const transaction = await sequelize.transaction();
  console.log("publicId" + publicId);
  try {
    const response = await BranchesModel.findOne({
      where: { public_id: publicId },
      transaction,
    });

    if (response) {
      const { concurrency_stamp: stamp } = response;

      if (concurrencyStamp === stamp) {
        const newConcurrencyStamp = uuidV1();
        const doc = {
          ...Helper.convertCamelToSnake(payload),
          updatedBy,
          concurrency_stamp: newConcurrencyStamp,
        };

        await BranchesModel.update(doc, {
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
    console.log(error + "eror");
    await transaction.rollback();

    return {
      errors: [{ name: "transaction", message: "transaction failed." }],
    };
  }
};

const updateStatus = async (payload) => {
  const { parentId, publicId, ...data } = payload;
  const { concurrencyStamp, updatedBy } = data;

  const transaction = await sequelize.transaction();

  try {
    const response = await BranchesModel.findOne({
      where: { public_id: publicId },
      transaction,
    });

    if (response) {
      const { concurrency_stamp: stamp } = response;

      if (concurrencyStamp === stamp) {
        const newConcurrencyStamp = uuidV1();
        const doc = {
          ...Helper.convertCamelToSnake(payload),
          updatedBy,
          concurrency_stamp: newConcurrencyStamp,
        };

        await BranchesModel.update(doc, {
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
    await transaction.rollback();

    return {
      errors: [{ name: "transaction", message: "transaction failed." }],
    };
  }
};

const getList = async (payload) => {
  const { role, pageSize, pageNumber, filters, sorting } = payload;

  const limit = pageSize;
  const offset = limit * (pageNumber - 1);

  const where = Helper.generateWhereCondition(filters);
  const order = Helper.generateOrderCondition(sorting);
  let whereStatus = {};

  if (!role === "admin") {
    whereStatus = {
      status: "active",
    };
  }

  const response = await BranchesModel.findAndCountAll({
    where: { ...where, ...whereStatus },
    attributes: [
      "public_id",
      "branch_name",
      "branch_code",
      "branch_description",

      "status",
      "concurrency_stamp",
      "created_at",
      "updated_at",
    ],
    order,
    limit,
    offset,
  });

  if (response) {
    const { count, rows } = response;
    const doc = rows.map((element) =>
      Helper.convertSnakeToCamel(element.dataValues)
    );

    return { count, doc };
  }

  return { count: 0, doc: [] };
};

const getListStatus = async (payload) => {
  const { role, pageSize, pageNumber, filters, sorting } = payload;

  const attributes = [
    "status",
    [sequelize.fn("COUNT", sequelize.col("status")), "count"],
  ];

  const group = ["status"];

  const response = await BranchesModel.findAndCountAll({
    attributes: attributes,
    group,
  });

  if (response) {
    const { count, rows } = response;
    const doc = rows.map((element) =>
      Helper.convertSnakeToCamel(element.dataValues)
    );

    return { count, doc };
  }

  return { count: 0, doc: [] };
};
const getStatsByFieldName = async (payload, fieldname) => {
  const { role, pageSize, pageNumber, filters, sorting } = payload;

  const attributes = [
    [sequelize.fn("DISTINCT", sequelize.col(fieldname)), fieldname],
    [sequelize.fn("COUNT", sequelize.col(fieldname)), "count"],
  ];

  const group = [fieldname];

  const response = await BranchesModel.findAndCountAll({
    attributes: attributes,
    group,
  });

  if (response) {
    const { count, rows } = response;
    const doc = rows.map((element) =>
      Helper.convertSnakeToCamel(element.dataValues)
    );

    return { count, doc };
  }

  return { count: 0, doc: [] };
};

module.exports = {
  save,
  update,
  getList,
  updateStatus,
  getListStatus,
  getStatsByFieldName,
};
