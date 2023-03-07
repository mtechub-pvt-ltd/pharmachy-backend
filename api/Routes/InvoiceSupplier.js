const router = require("express").Router();
const controller= require("../../Services/invoiceSupplierServices")

router.get("/get-all" ,controller.getAllinvoices)
router.get("/get-invoice-by-ID/:invoiceId" , controller.getSpecificinvoice)
router.delete("/delete/:invoiceId" , controller.deleteinvoice);
router.post("/create" , controller.createinvoice);
router.put("/update" , controller.updateinvoice);
router.delete("/deleteAll" , controller.deleteinvoiceAll);
router.post("/add_sale_orders" , controller.updateinvoiceSaleOrders);
router.post("/sort_invoice_by_date" , controller.getSpecificinvoiceByDate);
router.post("/sort_invoice_by_status_of_sale_order" , controller.getSpecificinvoiceByStatus);

module.exports = router;