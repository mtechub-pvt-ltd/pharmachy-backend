const mongoose = require("mongoose");
const purchases_order_productsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    purchases_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'purchases'
    },
    supplier_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supplier'
    },
    inventory_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventory'
    },
    // inventory_id 
    supplier_name:String,
    purchase_ref_no:String,
    date_of_order:String,
    product_name:String,
    pack_size:String,
    batch_number:String,
    expiry_date:String,
    quantity:String,
    purchases_rate_inRs:String,
    amount_in_Rs:String,
    discount_in_Rs:String,

    // sale_order_over_supply_order:{
    //     type: String,
    //     enum: ['complete','partial']
    // },
    // sale_order_state: {
    //     type: String,
    //     enum: ['active','pending','close']
    // },
    // order_delivery_status:{
    //     type: String,
    //     enum: ['processing','dispatched','delivered']
    // },
    // entry_of_ordered_products: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'order_product_sales'
    // }],


}
);
module.exports = mongoose.model("purchases_order_products", purchases_order_productsSchema);