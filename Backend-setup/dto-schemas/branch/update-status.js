const updateStatus = {
    title: 'branch form',
    description: 'Defines the structure for HTTP POST request body',
    type: 'object',
    properties: {
      publicId: {
        type: 'string',
        description: 'public id of branch',
        format: 'uuid',
      },
      status: {
        type: 'string',
        description: 'status',
        enum: [ 'active', 'inactive'],
      },
      updatedBy: {
        type: 'string',
        description: 'user id of user',
        format: 'uuid',
      },
      concurrencyStamp: {
        type: 'string',
        description: 'unique reference of concurrencyStamp',
        format: 'uuid',
      },
    },
    required: [ 'publicId', 'concurrencyStamp', 'status' ],
  
    errorMessage: {
      required: {
        createdBy: 'Parameter: createdBy is required in the body.',
        status: 'Parameter: status is required in the body.',
      },
      properties: {
  
      },
    },
    additionalProperties: false,
  };
  
  module.exports = updateStatus;