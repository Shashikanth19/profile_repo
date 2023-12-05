const updateCustomers = {
  title: "Update Customers form",
  description: "Defines the structure for HTTP POST request body",
  type: "object",
  properties: {
    publicId: {
      type: "string",
      description: "public guid of the Customers",
      format: "uuid",
    },
    mobileNo: {
      type: "number",
      description: "mobile number of customer",
    },
    name: {
      type: "string",
      description: "name of customer",
    },

    updatedBy: {
      type: "string",
      description: "unique reference of updatedBy",
      format: "uuid",
    },
    concurrencyStamp: {
      type: "string",
      description: "unique reference of concurrencyStamp",
      format: "uuid",
    },
  },
  errorMessage: {
    required: {
      publicId: "Parameter: publicId is required in the body.",
      concurrencyStamp: "Parameter: concurrencyStamp is required in the body.",
      updatedBy: "Parameter: updatedBy is required in the body.",
    },
    properties: {},
  },
  required: ["publicId", "concurrencyStamp", "updatedBy"],
  additionalProperties: true,
};

module.exports = updateCustomers;
