const updateDesignations = {
    title: 'Update Designations form',
    description: 'Defines the structure for HTTP PATCH request body',
    type: 'object',
    properties: {
      publicId: {
        type: 'string',
        description: 'public guid of the Designations',
        format: "uuid"
      },
      desgName: {
        type: "string",
        description: " desgName",
      },
     
      concurrencyStamp: {
        type: 'string',
        description: 'unique reference of concurrencyStamp',
        format: "uuid"
      },
    },
    required: ['publicId', 'concurrencyStamp'],
    errorMessage: {
      required: {
        publicId: 'Parameter: publicId is required in the body.',
        concurrencyStamp: 'Parameter: concurrencyStamp is required in the body.',
      },
    },
    additionalProperties: false,
  };
  
  module.exports = updateDesignations;
  