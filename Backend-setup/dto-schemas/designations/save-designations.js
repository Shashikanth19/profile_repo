const saveDesignations = {
  title: "Add Desingations form",
  description: "Defines the structure for HTTP POST request body",
  type: "object",
  properties: {
    desgName: {
      type: "string",
      description: " desgName",
    },
  },
  errorMessage: {
    required: {
      desgName: "Parameter: desgName is required in the body.",
    },
    properties: {},
  },
  required: ["desgName"],
  additionalProperties: false,
};

module.exports = saveDesignations;
