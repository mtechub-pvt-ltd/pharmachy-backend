const router = require("express").Router();
const controller= require("../../Services/orderProductsPurchasesServices")

router.get("/get-all" ,controller.getAllorderedProductPurchasesSales)
router.get("/get-by-ID/:orderedProductPurchasesId" , controller.getSpecificorderedProductPurchasesSale)
router.delete("/delete/:orderedProductPurchasesId" , controller.deleteorderedProductPurchasesSale);
router.delete("/deleteAll" , controller.deleteOrderProductsAllSale);
router.post("/get-purchases-by-purchase-order-id" , controller.getOrderedPrductsOfSingleSaleSP)

router.post("/create" , controller.createorderedProductPurchasesSale);
router.put("/update" , controller.updateorderedProductPurchasesSale);

module.exports = router;