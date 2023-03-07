const router = require("express").Router();
const controller= require("../../Services/saleOrderServices")

router.get("/get-all" ,controller.getAllsaleOrders)
router.get("/get-saleOrder-by-ID/:saleOrderId" , controller.getSpecificsaleOrder)
router.delete("/delete/:saleOrderId" , controller.deletesaleOrder);
router.post("/create" , controller.createsaleOrder);
router.put("/update" , controller.updatesaleOrder);
router.delete("/deleteAll" , controller.deletesaleOrderAll);
router.get("/get-sales-by-supplyOrder-Id/:supply_order_id" , controller.getSpecificsaleOrderBySupplyId)
router.get("/get-all-saleorder-summary" ,controller.getAllsaleOrdersSummary)
router.post("/get-all-saleorder-by-customer" ,controller.getAllsaleOrdersByCustomer)
router.post("/get-all-saleorder-customers" ,controller.getAllsaleOrdersCustomer)
router.post("/get-all-saleorder-by-date-range" ,controller.getAllsaleOrdersByDateRange)
router.post("/get-all-saleorder-customers-Order-delivery-status" ,controller.getAllCustomerSalesByOrderDeliveryStatus)
router.post("/get-all-saleorder-customers-byCurrentYear" ,controller.getAllCustomerSalesByYearCurrent)

module.exports = router;