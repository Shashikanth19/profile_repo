const { save, getList,update , updateStatus } = require('../controllers/designations');

module.exports = (router) => {
    router.post("/designations", save)
    router.get("/designations", getList);
    router.patch("/designations/:publicId", update);
    router.patch("/designations-status-update/:publicId", updateStatus);
}