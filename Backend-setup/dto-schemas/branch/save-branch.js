const saveBranch = {
  title: 'Add branch form',
  description: 'Defines the structure for HTTP POST request body',
  type: 'object',
  properties: {
   
    branch_name: {
      type: 'string',
      description: ' branchName',
    },
    branch_code: {
      type: 'string',
      description: ' branchCode',
    },
    branch_description: {
      type: 'string',
      description: 'description of branch',
    },

    status: {
      type: 'string',
      description: 'status of branch',
      enum: [ 'inactive', 'active' ],
    },
   
    // createdBy: {
    //   type: 'string',
    //   description: 'unique reference of updatedBy',
    //   format: 'uuid',
    // },
    
  },
  errorMessage: {
    required: {
      branch_name: 'Parameter: name is required in the body.',
      branch_code:'Parameter: branchCode is required in the body.',
      branch_description:'Parameter: branchDescription is required in the body.',
      status: 'Parameter: status is required in the body.',
    },
    properties: {

    },
  },
  required: [ 'branch_name', 'status', 'branch_description' ],
  additionalProperties: false,
};

module.exports = saveBranch;
