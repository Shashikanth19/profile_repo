const updateDesignationsStatus = {
    title: "update Designations Status",
    description:
      "Defines the structure for an HTTP POST request body to update the status of a Designations record",
    type: "object",
    properties: {
      publicId: {
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
      concurrencyStamp: {
        type: "string",
        description: "Unique reference of concurrencyStamp",
        format: "uuid"
      },
    },
    required: ["publicId", "status", "concurrencyStamp"],
    errorMessage: {
      required: {
        publicId: "Parameter: publicId is required in the body.",
        status: "Parameter: status is required in the body.",
        // updatedBy: "Parameter: updatedBy is required in the body.",
        concurrencyStamp: "Parameter: concurrencyStamp is required in the body.",
      },
    },
    additionalProperties: false,
  };
  
  module.exports = updateDesignationsStatus;
  