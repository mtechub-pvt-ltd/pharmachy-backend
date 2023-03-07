const router = require("express").Router();
const controller= require("../../Services/purchasesServices")

router.get("/get-all" ,controller.getAllpurchasess)
router.get("/get-purchases-by-ID/:purchasesId" , controller.getSpecificpurchases)
router.delete("/delete/:purchasesId" , controller.deletepurchases);
router.post("/create" , controller.createpurchases);
router.put("/update" , controller.updatepurchases);
router.delete("/deleteAll" , controller.deletepurchasesAll);
router.get("/get-sales-by-supplyOrder-Id/:supply_order_id" , controller.getSpecificpurchasesBySupplyId)
router.get("/get-all-purchases-summary" ,controller.getAllpurchasessSummary)

module.exports = router;