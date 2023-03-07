const router = require("express").Router();
const controller= require("../../Services/supply_orderServices")

router.get("/get-all" ,controller.getAllsupplyOrders)
router.get("/get-supplyOrder-by-ID/:supplyOrderId" , controller.getSpecificsupplyOrder)
router.delete("/delete/:supplyOrderId" , controller.deletesupplyOrder);
router.delete("/deleteAll" , controller.deletesupplyOrderAll);
router.post("/get-customer-supply-order" , controller.getSpecificCustomerSO)
router.post("/get-all-supplyorder-summary" ,controller.getAllsupplyOrdersSummary)
router.post("/create" , controller.createsupplyOrder);
router.put("/update" , controller.updatesupplyOrder);
router.post("/get-all-yearly-report-sales" ,controller.getallmonthlysupplyorders)
router.post("/get-all-daily-report-sales" ,controller.getdailysupplyOrderSales)
router.post("/get-all-weekly-report-sales" ,controller.getweeklysupplyOrderSales)
router.post("/get-all-supply-orders-completed-count" ,controller.getAllsupplyOrdersCompletedCount)
router.get("/get-all-supply-orders-due" ,controller.getAllsupplyOrdersDue)

module.exports = router;