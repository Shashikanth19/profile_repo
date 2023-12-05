const updateCustomersStatus = {
    title: 'Customers form',
    description: 'Defines the structure for HTTP POST request body',
    type: 'object',
    properties: {
      publicId: {
        type: 'string',
        description: 'public id of Customers ',
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
    required: [  'status' ],
  
    errorMessage: {
      required: {
        status: 'Parameter: status is required in the body.',
      },
      properties: {
  
      },
    },
    additionalProperties: false,
  };
  
  module.exports = updateCustomersStatus;