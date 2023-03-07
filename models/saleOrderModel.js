const mongoose = require("mongoose");
const sale_orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    invoiced:{
        type: String,
        enum: ['billed','unbilled']
    },
    supply_order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supply_order'
    },
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    customer_name:String,
    sale_ref_no:String,
    date_of_order:String,
    sale_order_over_supply_order:{
        type: String,
        enum: ['complete','partial']
    },
    sale_order_state: {
        type: String,
        enum: ['active','pending','close']
    },
    order_delivery_status:{
        type: String,
        enum: ['processing','dispatched','delivered']
    },
    entry_of_ordered_products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order_product_sales'
    }],
    invoice_created_status:{
        type: String,
        enum: ['invoiced','not invoiced']
    }


}
);
module.exports = mongoose.model("sale_order", sale_orderSchema);