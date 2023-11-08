const saveBranch = {
  title: 'Add branch form',
  description: 'Defines the structure for HTTP POST request body',
  type: 'object',
  properties: {
   
    branchName: {
      type: 'string',
      description: ' branchName',
    },
    // userId: {
    //   type: "string",
    //   description: "unique reference of user",
    //   format: 'uuid',
    // },
    branchCode: {
      type: 'string',
      description: ' branchCode',
    },
    branchDescription: {
      type: 'string',
      description: 'description of branch',
    },

    status: {
      type: 'string',
      description: 'status of branch',
      enum: [ 'inactive', 'active' ],
    },
   
    createdBy: {
      type: 'string',
      description: 'unique reference of updatedBy',
      format: 'uuid',
    },
    
  },
  errorMessage: {
    required: {
      branchName: 'Parameter: name is required in the body.',
      branchCode:'Parameter: branchCode is required in the body.',
      branchDescription:'Parameter: branchDescription is required in the body.',
      status: 'Parameter: status is required in the body.',
    },
    properties: {

    },
  },
  required: [ 'branchName', 'status', 'branchDescription' ],
  additionalProperties: false,
};

module.exports = saveBranch;
