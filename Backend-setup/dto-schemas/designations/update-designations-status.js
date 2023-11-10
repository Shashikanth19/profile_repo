const updateDesignationsStatus = {
    title: "update Designations Status",
    description:
      "Defines the structure for an HTTP POST request body to update the status of a Designations record",
    type: "object",
    properties: {
      public_id: {
        type: "string",
        description: "Public ID of the Designations",
        format: "uuid"
      },
  
      status: {
        type: "string",
        description: "Status of the Designations",
        enum: [
          "active",
          "inactive",
        ],
      },
      // updatedBy: {
      //   type: "string",
      //   description: "User ID of the user making the update",
      //   format: "uuid"
      // },
      concurrency_stamp: {
        type: "string",
        description: "Unique reference of concurrencyStamp",
        format: "uuid"
      },
    },
    required: ["public_id", "status", "concurrency_stamp"],
    errorMessage: {
      required: {
        public_id: "Parameter: public_id is required in the body.",
        status: "Parameter: status is required in the body.",
        // updatedBy: "Parameter: updatedBy is required in the body.",
        concurrency_stamp: "Parameter: concurrencyStamp is required in the body.",
      },
    },
    additionalProperties: false,
  };
  
  module.exports = updateDesignationsStatus;
  