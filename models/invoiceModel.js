const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type_of_invoice:{
        type: String,
        enum: ['tax invoice','cash invoice']
    },
    invoice_number:String,
    supply_order_ref_no:String,
    supply_order_date:String,
    invoice_date:String,
    due_date:String,
    delivery_challan_no:String,
    booked_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff'
    },
    delivered_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff'
    },
    courier_ref_track_no:String,
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    customer_NIC:String,
    customer_name:String,
    customer_sales_tax_reg_no:String,
    supply_order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supply_order'
    },
    sale_orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sale_order'
    }],
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
    notes:String
}
);
module.exports = mongoose.model("invoice", inventorySchema);