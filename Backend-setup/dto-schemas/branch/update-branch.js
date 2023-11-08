const updateBranch = {
  title: 'Update branch form',
  description: 'Defines the structure for HTTP POST request body',
  type: 'object',
  properties: {
    publicId: {
      type: 'string',
      description: 'public guid of the branch',
      format: 'uuid',
    },
    // userId: {
    //   type: "string",
    //   description: "unique reference of user",
    //   format: 'uuid',
    // },
    branchName: {
      type: 'string',
      description: ' branchName',
    },
    branchCode: {
      type: 'string',
      description: ' branchCode',
    },
    branchDescription: {
      type: 'string',
      description: 'description of branch',
    },
   
    updatedBy: {
      type: 'string',
      description: 'unique reference of updatedBy',
      format: 'uuid',
    },
    concurrencyStamp: {
      type: 'string',
      description: 'unique reference of concurrencyStamp',
      format: 'uuid',
    },
    languages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          locale: {
            type: 'string',
            description: 'locale name',
          },
          name: {
            type: 'string',
            description: 'brand name',
          },
          description: {
            type: 'string',
            description: 'brand description',
          },
        },
        required: [
          'locale', 'name', 'description',
        ],
        errorMessage: {
          required: {

          },
          properties: {

          },
        },
      },
    },
  },
  errorMessage: {
    required: {
      branchName: 'Parameter: name is required in the body.',
    },
    properties: {

    },
  },
  required: [ 'publicId', 'concurrencyStamp' ],
  additionalProperties: false,
};

module.exports = updateBranch;
