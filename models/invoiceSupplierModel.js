const mongoose = require("mongoose");
const invoiceSupplierSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    invoice_number:String,
    tax_warrant_invoice_no:String,
    delivery_challan_no:String,
    stock_receiving_dateTime:String,
    purchase_order_ref_no:String,
    purchase_order_date:String,
    invoice_date:String,
    invoice_due_date:String,
    supplier_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supplier'
    },
    supplier_name:String,
    discount_in_Rs_and_percent:String,
    purchase_order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'purchase_order'
    },
    purchases:Array,
    sales_tax:String,
    general_sales_tax:String,
    advance_tax:String,
    further_tax:String,
    Tax_amount:String,
    invoice_status:{
        type: String,
        enum: ['no paid','overdue','partially paid','paid']
    },
    total_payable:String,
}
);
module.exports = mongoose.model("invoiceSupplier", invoiceSupplierSchema);