const saveCustomers = {
  title: "Add Customers form",
  description: "Defines the structure for HTTP POST request body",
  type: "object",
  properties: {
    mobileNo: {
      type: "number",
      description: "mobile number of customer",
    },
    name: {
      type: "string",
      description: "name of customer",
    },

    createdBy: {
      type: "string",
      description: "unique reference of createdBy",
      format: "uuid",
    },
  },
  errorMessage: {
    required: {
      mobileNo: "Parameter: mobileNo is required in the body.",
      name: "Parameter: name is required in the body.",
    },
    properties: {},
  },
  required: ["mobileNo", "name"],
  additionalProperties: true,
};

module.exports = saveCustomers;
