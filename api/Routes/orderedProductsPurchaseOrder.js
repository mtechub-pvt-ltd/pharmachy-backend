const router = require("express").Router();
const controller= require("../../Services/orderedProductsPurchaseOrderServices")

router.get("/get-all" ,controller.getAllorderedProductsP)
router.get("/get-by-ID/:orderedProductId" , controller.getSpecificorderedProductP)
router.delete("/delete/:orderedProductId" , controller.deleteorderedProductP);
router.delete("/deleteAll" , controller.deleteOrderProductsAllP);
router.post("/get-orderedProducts-of-single-purchase-order" , controller.getOrderedPrductsOfSingleSPP)

router.post("/create" , controller.createorderedProductP);
router.put("/update" , controller.updateorderedProductP);

module.exports = router;