const mongoose = require("mongoose");
const order_product_salesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    supply_order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supply_order'
    },
    sale_order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sale_order'

    },
    date_of_order:String,
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
    packing: String,
    m_r_p: String,
    quantity: String,
    total_amount: String,

}
);
module.exports = mongoose.model("order_product_sales", order_product_salesSchema);