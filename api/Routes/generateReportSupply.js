const router = require("express").Router();
const controller= require("../../Services/generate_report_supplyServices")

router.get("/get-all" ,controller.getAllgenerate_report_supplys)
router.get("/get-generate_report_supply-by-ID/:generate_report_supplyId" , controller.getSpecificgenerate_report_supply)
router.delete("/delete/:generate_report_supplyId" , controller.deletegenerate_report_supply);
router.post("/create" , controller.creategenerate_report_supply);
router.put("/update" , controller.updategenerate_report_supply);
router.delete("/deleteAll" , controller.deletegenerate_report_supplyAll);
router.post("/create-ordered-product-for-report" , controller.Orderproducts_Report);
router.post("/get-all-reports-by-supply-order-id" ,controller.get_report_supply_by_supply_order_id)


module.exports = router;