const router = require("express").Router();
const controller= require("../../Services/reportsServices")

router.get("/get-all" ,controller.getAllreports)
router.get("/get-report-by-ID/:reportId" , controller.getSpecificreport)
router.delete("/delete/:reportId" , controller.deletereport);
router.post("/create" , controller.createreport);
router.put("/update" , controller.updatereport);
router.delete("/deleteAll" , controller.deletereportAll);
router.post("/get-report-by-report-type" , controller.getSpecificreportByRoles)

module.exports = router;