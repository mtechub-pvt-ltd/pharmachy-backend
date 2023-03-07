const mongoose = require("mongoose");
const order_productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    supply_order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supply_order'
    },
    inventory_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventory'
    },
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
module.exports = mongoose.model("order_product", order_productSchema);