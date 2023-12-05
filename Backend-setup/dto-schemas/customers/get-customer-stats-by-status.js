const getCustomerStatsByStatus = {
    title: 'Get Statistics by Status',
    description: 'Defines the structure for HTTP GET request parameters',
    type: 'object',
    properties: {
      status: {
        type: 'string',
        description: 'Customer status',
        enum: ['active', 'inactive'],
      },
    },
    errorMessage: {
      required: {
        status: 'Parameter: status is required in the query parameters.',
      },
      properties: {
        status: 'Parameter: status should be either "active" or "inactive".',
      },
    },
  };
  
  module.exports = getCustomerStatsByStatus;
  