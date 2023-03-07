const mongoose = require("mongoose");
const purchasesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    invoiced:{
        type: String,
        enum: ['billed','unbilled']
    },
    date_of_purchase_order: String,
    purchase_order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'purchase_order'
    },
    purchase_order_ref_no:String,
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supplier'
    },
    ref_no: String,
    tax_warrant_invoice_no:String,
    delivery_challan_no:String,
    stock_receiving_dateTime:String,
    invoice_date:String,
    invoice_due_date:String,
    supplier_applicable_tax:String,
    amount_in_Rs:String,
    discount_in_Rs_and_percent:String,
    sales_tax:String,
    general_sales_tax:String,
    advance_tax:String,
    further_tax:String,
    total_invoice_amount:String,
    details_of_stock_received:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'purchases_order_products'
    }],


}
);
module.exports = mongoose.model("purchases", purchasesSchema);