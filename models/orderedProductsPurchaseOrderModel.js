const mongoose = require("mongoose");
const order_product_purchase_orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    purchase_order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'purchase_order'
    },
    date_of_order:String,
    expiry_date:String,
    inventory_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventory'
    },
    item_code:String,
    registration_no:String,
    generic_name:String,
    batch_no:String,
    brand_name: String,
    company_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    company_name: String,
    m_r_p: String,
    quantity: String,
    total_amount: String,

}
);
module.exports = mongoose.model("order_product_purchase_order", order_product_purchase_orderSchema);