const router = require("express").Router();
const controller= require("../../Services/accountsServices")

router.get("/get-all" ,controller.getAllaccounts)
router.post("/get-all-by-date-range" ,controller.getAllaccountsReportByDateRange)

router.get("/get-account-by-ID/:accountId" , controller.getSpecificaccount)
router.delete("/delete/:accountId" , controller.deleteaccount);
router.post("/create" , controller.createaccount);
router.post("/get-account-by-type" , controller.getAccountByType)
router.post("/get-accountTotal-by-type" , controller.getTotalAccountsByType)


router.put("/update" , controller.updateaccount);
router.delete("/deleteAll" , controller.deleteaccountAll);

module.exports = router;