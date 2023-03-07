const router = require("express").Router();
const controller= require("../../Services/inventoryServices")

router.get("/get-all" ,controller.getAllinventorys)
router.get("/get-inventory-by-ID/:inventoryId" , controller.getSpecificinventory)
router.delete("/delete/:inventoryId" , controller.deleteinventory);
router.delete("/deleteAll" , controller.deleteInventoryAll);

router.post("/create" , controller.createinventory);
router.put("/update" , controller.updateinventory);
router.post("/get-inventory-by-Product" , controller.getSpecificinventoryByProduct)
router.post("/get-inventory-by-Generic-Name" , controller.getSpecificinventoryByGenericname)
router.post("/get-inventory-by-Company-Name" , controller.getSpecificinventoryByCompanyName)
router.post("/get-inventory-by-TP" , controller.getSpecificinventoryByTP)


module.exports = router;