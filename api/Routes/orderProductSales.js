const router = require("express").Router();
const controller= require("../../Services/orderProductSalesServices")

router.get("/get-all" ,controller.getAllorderedProductSales)
router.get("/get-orderedProduct-by-ID/:orderedProductId" , controller.getSpecificorderedProductSale)
router.delete("/delete/:orderedProductId" , controller.deleteorderedProductSale);
router.delete("/deleteAll" , controller.deleteOrderProductsAllSale);
router.post("/get-orderedProducts-of-single-supply-order" , controller.getOrderedPrductsOfSingleSaleSP)
router.post("/create" , controller.createorderedProductSale);
router.put("/update" , controller.updateorderedProductSale);
router.post("/get-product-of-sales-report" , controller.getOrderedPrductsReport)
router.post("/get-single-product-of-sales-report" , controller.getOrderedPrductsReportSingle)
router.post("/get-product-of-sales-report-by-date-range" , controller.getOrderedPrductsReportByDateRange)
router.post("/get-product-of-purchase-report" , controller.getOrderedPrductsReportPurchases)
router.post("/get-single-company-of-sales-report" , controller.getOrderedPrductsReportSingleCom)
router.post("/get-company-of-sales-report" , controller.getOrderedCompanysReport)

module.exports = router;