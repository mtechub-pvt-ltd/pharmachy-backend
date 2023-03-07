const router = require("express").Router();
const controller= require("../../Services/supplierServices")

router.get("/get-all" ,controller.getAllsuppliers)
router.get("/get-supplier-by-ID/:supplierId" , controller.getSpecificsupplier)
router.delete("/delete/:supplierId" , controller.deletesupplier);
router.post("/create" , controller.createsupplier);
router.put("/update" , controller.updatesupplier);
router.delete("/deleteAll" , controller.deletesupplierAll);


module.exports = router;