const router = require("express").Router();
const controller= require("../../Services/orderProductServices")

router.get("/get-all" ,controller.getAllorderedProducts)
router.get("/get-orderedProduct-by-ID/:orderedProductId" , controller.getSpecificorderedProduct)
router.delete("/delete/:orderedProductId" , controller.deleteorderedProduct);
router.delete("/deleteAll" , controller.deleteOrderProductsAll);
router.post("/get-orderedProducts-of-single-supply-order" , controller.getOrderedPrductsOfSingleSP)

router.post("/create" , controller.createorderedProduct);
router.put("/update" , controller.updateorderedProduct);
router.post("/get-products-sales-graph" , controller.getAllorderedProductsGraph)

module.exports = router;