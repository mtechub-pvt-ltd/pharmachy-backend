const router = require("express").Router();
const controller= require("../../Services/customerServices")

router.get("/get-all" ,controller.getAllcustomers)
router.get("/get-customer-by-ID/:customerId" , controller.getSpecificcustomer)
router.delete("/delete/:customerId" , controller.deletecustomer);
router.post("/create" , controller.createcustomer);
router.put("/update" , controller.updatecustomer);
router.delete("/deleteAll" , controller.deleteCustomersAll);


module.exports = router;