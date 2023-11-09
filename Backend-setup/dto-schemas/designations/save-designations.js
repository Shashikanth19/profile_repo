const saveDesignations = {
  title: "Add Desingations form",
  description: "Defines the structure for HTTP POST request body",
  type: "object",
  properties: {
    desg_name: {
      type: "string",
      description: " desg_name",
    },
  },
  errorMessage: {
    required: {
      desg_name: "Parameter: desg_name is required in the body.",
    },
    properties: {},
  },
  required: ["desg_name"],
  additionalProperties: false,
};

module.exports = saveDesignations;
