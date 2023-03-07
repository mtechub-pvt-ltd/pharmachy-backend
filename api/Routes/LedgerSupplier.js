const router = require("express").Router();
const controller= require("../../Services/ledgerSupplierServices")

router.get("/get-all" ,controller.getAllledgers)
router.post("/get-by-supplier-id" , controller.getSpecificledger)
router.delete("/delete/:ledgerId" , controller.deleteledger);
router.post("/create" , controller.createledger);
router.put("/update" , controller.updateledger);
router.delete("/deleteAll" , controller.deleteledgerAll);

module.exports = router;