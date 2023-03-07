const router = require("express").Router();
const controller= require("../../Services/staffServices")

router.get("/get-all" ,controller.getAllstaffs)
router.get("/get-staff-by-ID/:staffId" , controller.getSpecificstaff)
router.delete("/delete/:staffId" , controller.deletestaff);
router.post("/create" , controller.createstaff);
router.put("/update" , controller.updatestaff);
router.delete("/deleteAll" , controller.deletestaffAll);
router.post("/get-staff-by-roles" , controller.getSpecificstaffByRoles)
router.post("/get-staff-by-roles-percentage" , controller.getSpecificstaffByRolesStaff)

module.exports = router;