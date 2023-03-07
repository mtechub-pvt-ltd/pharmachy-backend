const router = require("express").Router();
const controller= require("../../Services/accountBalanceServices")

router.get("/get-all" ,controller.getAllaccounts)
router.get("/get-account-by-ID/:accountId" , controller.getSpecificaccount)
router.delete("/delete/:accountId" , controller.deleteaccount);
router.post("/create" , controller.createaccount);
router.put("/update" , controller.updateaccount);
router.delete("/deleteAll" , controller.deleteaccountAll);

module.exports = router;