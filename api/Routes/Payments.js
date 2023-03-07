const router = require("express").Router();
const controller= require("../../Services/paymentsServices")

router.get("/get-all" ,controller.getAllpayments)
router.get("/get-payment-by-ID/:paymentId" , controller.getSpecificpayment)
router.delete("/delete/:paymentId" , controller.deletepayment);
router.post("/create" , controller.createpayment);
router.put("/update" , controller.updatepayment);
router.delete("/deleteAll" , controller.deletepaymentAll);
router.post("/get-by-payer-type" , controller.getSpecificpaymentBypayerType)

module.exports = router;