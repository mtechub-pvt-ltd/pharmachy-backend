const router = require("express").Router();
const controller= require("../../Services/purchase_orderServices")

router.get("/get-all" ,controller.getAllpurchaseOrders)
router.get("/get-purchaseOrder-by-ID/:purchaseOrderId" , controller.getSpecificpurchaseOrder)
router.delete("/delete/:purchaseOrderId" , controller.deletepurchaseOrder);
router.post("/create" , controller.createpurchaseOrder);
router.put("/update" , controller.updatepurchaseOrder);
router.delete("/deleteAll" , controller.deletepurchaseOrderAll);
router.post("/get-supplier-purchase-order" , controller.getSpecificsupplierPO);
router.post("/get-purchase-order-completed" , controller.getAllpurchaseOrdersCompletedCount);
router.get("/get-purchase-order-due" , controller.getAllPurchaseOrdersDue);

module.exports = router;