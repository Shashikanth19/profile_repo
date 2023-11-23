const { generatePDFController } = require("../controllers/pdf");

const isAuthorized = require("../services/firebase/authenticate");

module.exports = (router) => {
  router.get(
    "/generate-pdf",
    isAuthorized("supplier", "admin"),
    generatePDFController
  );
};