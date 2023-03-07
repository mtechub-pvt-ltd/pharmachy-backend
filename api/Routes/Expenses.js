const router = require("express").Router();
const controller= require("../../Services/expensesServices")

router.get("/get-all" ,controller.getAllexpenses)
router.get("/get-expense-by-ID/:expenseId" , controller.getSpecificexpense)
router.post("/get-expense-by-mode" , controller.getSpecificexpenseByMode)

router.delete("/delete/:expenseId" , controller.deleteexpense);
router.post("/create" , controller.createexpense);
router.put("/update" , controller.updateexpense);
router.delete("/deleteAll" , controller.deleteexpenseAll);

module.exports = router;