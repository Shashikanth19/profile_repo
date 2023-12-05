const { customers: CustomersModel, sequelize } = require("../database");
const uuidV1 = require("uuid/v1");
const Helper = require("../utils/helper");
// const { io } = require("../socketIo"); // Adjust the path accordingly

const save = async (payload) => {
  const transaction = await sequelize.transaction();

  try {
    const { ...data } = payload;
    // Generate unique IDs
    const publicId = uuidV1();
    const concurrencyStamp = uuidV1();

    // Create document object
    const doc = {
      publicId,
      ...data,
      concurrencyStamp,
    };

    // Create a new record in CustomersModel within the transaction
    const customers = await CustomersModel.create({
      ...Helper.convertCamelToSnake(doc),
      transaction,
    });
    // Emit a custom event to notify frontend about posCartAdded
    io.emit("customersAdded", {
    customers
    });

    // Emit a custom event to notify suppliers
    io.emit("supplierNotification", {
      message: "New customer placed an order. Please check your notifications.",
    });

    // Commit the transaction if everything is successful
    await transaction.commit();

    // Return the publicId in the response
    return { doc: { publicId } };
  } catch (error) {
    // If an error occurs, rollback the transaction
    await transaction.rollback();

    // Handle the error, log it, or rethrow if needed
    console.error("Error in save function:", error);
    throw error; // Re-throw the error to propagate it further
  }
};

const getList = async (payload) => {
  const { role, pageSize, pageNumber, filters, sorting } = payload;

  // Calculate limit and offset for pagination
  const limit = pageSize;
  const offset = limit * (pageNumber - 1);

  // Generate WHERE and ORDER conditions based on filters and sorting
  const where = Helper.generateWhereCondition(filters);
  const order = Helper.generateOrderCondition(sorting);

  // Initialize a default WHERE condition for user role filtering
  let whereStatus = {};

  // Check if the user is not an admin, apply status filter for non-admin users
  if (!role === "admin") {
    whereStatus = {
      status: "active",
    };
  }

  // Retrieve and count customers based on the provided conditions
  const response = await CustomersModel.findAndCountAll({
    where: { ...where, ...whereStatus },
    order,
    limit,
    offset,
  });

  // If response exists, extract count and convert snake_case to camelCase for each customer
  if (response) {
    const { count, rows } = response;
    const doc = rows.map((element) =>
      Helper.convertSnakeToCamel(element.dataValues)
    );

    // Return the count and the transformed data
    return { count, doc };
  }

  // Return default values if no response is found
  return { count: 0, doc: [] };
};

const update = async (payload) => {
  try {
    const { publicId, ...data } = payload;

    const { concurrencyStamp, updatedBy } = data;

    const transaction = await sequelize.transaction();

    /** Find the record in CustomersModel with the given publicId */
    const response = await CustomersModel.findOne({
      where: { public_id: publicId },
      transaction,
    });

    if (response) {
      const { concurrency_stamp: stamp } = response;

      /** Check if the provided concurrencyStamp matches the stored one */
      if (concurrencyStamp === stamp) {
        /** Generate a new concurrency stamp */
        const newConcurrencyStamp = uuidV1();

        /** Create document object with updated concurrency stamp */
        const doc = {
          ...Helper.convertCamelToSnake(payload),
          concurrency_stamp: newConcurrencyStamp,
        };

        /** Update the record in CustomersModel with the new document */
        await CustomersModel.update(doc, {
          where: { public_id: publicId },
          transaction,
        });

        /** Commit the transaction if everything is successful */
        await transaction.commit();

        /** Return the updated concurrency stamp in the response */
        return { doc: { concurrencyStamp: newConcurrencyStamp } };
      }

      /** Rollback the transaction if concurrency stamps do not match */
      await transaction.rollback();

      /** Return an error message for invalid concurrency stamp */
      return { concurrencyError: { message: "Invalid concurrency stamp" } };
    }

    /** Return an empty object if no record is found for the given publicId */
    return {};
  } catch (error) {
    console.error("Error in update function:", error);

    await transaction.rollback();
    throw error;
  }
};

const updateStatus = async (payload) => {
  try {
    const { publicId, ...data } = payload;
    const { concurrencyStamp, updatedBy } = data;

    const transaction = await sequelize.transaction();

    /** Find the record in CustomersModel with the given publicId */
    const response = await CustomersModel.findOne({
      where: { public_id: publicId },
      transaction,
    });

    if (response) {
      const { concurrency_stamp: stamp } = response;

      if (concurrencyStamp === stamp) {
        const newConcurrencyStamp = uuidV1();

        /** Create document object with updated concurrency stamp */
        const doc = {
          ...Helper.convertCamelToSnake(payload),
          concurrency_stamp: newConcurrencyStamp,
        };

        /** Update the record in CustomersModel with the new document */
        await CustomersModel.update(doc, {
          where: { public_id: publicId },
          transaction,
        });

        await transaction.commit();
        return { doc: { concurrencyStamp: newConcurrencyStamp } };
      }
      await transaction.rollback();
      return { concurrencyError: { message: "Invalid concurrency stamp" } };
    }

    return {};
  } catch (error) {
    console.error("Error in updateStatus function:", error);

    await transaction.rollback();
    throw error;
  }
};

const getCustomerByMobile = async (payload) => {
  try {
    const { mobileNo } = payload;

    const response = await CustomersModel.findOne({
      where: { mobile_no: mobileNo },
    });

    if (response) {
      const doc = Helper.convertSnakeToCamel(response.dataValues)
      return { doc };
    }
    else{
      return { errors: "No Data Found with given Mobile Number"}
    }
  } catch (error) {
    console.error("Error in getCustomerByMobile function:", error);

    throw error;
  }
};

const getCustomerStatsByStatus = async (data) => {
  const { status } = data;

  try {
    const response = await CustomersModel.findAndCountAll({
      where: { status: status },
      attributes: [
        "status",
        [sequelize.fn("count", sequelize.col("status")), "count"],
      ],
      group: ["status"],
    });

    console.log("response", response);
    if (response) {
      const { rows } = response;
      const doc = rows.map(({ dataValues }) => ({
        status: Helper.convertSnakeToCamel(dataValues.status),
        count: dataValues.count,
      }));

      return { doc };
    }
    return {};
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  save,
  update,
  getList,
  updateStatus,
  getCustomerByMobile,
  getCustomerStatsByStatus
};
