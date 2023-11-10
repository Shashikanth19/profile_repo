const updateDesignations = {
    title: 'Update Designations form',
    description: 'Defines the structure for HTTP PATCH request body',
    type: 'object',
    properties: {
      public_id: {
        type: 'string',
        description: 'public guid of the Designations',
        format: "uuid"
      },
      desg_name: {
        type: "string",
        description: " desg_name",
      },
     
      concurrency_stamp: {
        type: 'string',
        description: 'unique reference of concurrencyStamp',
        format: "uuid"
      },
    },
    required: ['public_id', 'concurrency_stamp'],
    errorMessage: {
      required: {
        public_id: 'Parameter: publicId is required in the body.',
        concurrency_stamp: 'Parameter: concurrencyStamp is required in the body.',
      },
    },
    additionalProperties: false,
  };
  
  module.exports = updateDesignations;
  