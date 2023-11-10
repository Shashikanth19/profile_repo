const { save, getList,update , updateStatus } = require('../controllers/designations');

module.exports = (router) => {
    router.post("/designations", save)
    router.get("/designations", getList);
    router.patch("/designations/:public_id", update);
    router.patch("/designations-status-update/:public_id", updateStatus);
}