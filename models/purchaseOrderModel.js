const mongoose = require("mongoose");
const purchase_orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supplier'
    },
    supplier_name:String,
    type_of_supplier: {
        type: String,
        enum: ['importer','manufacturer','distributer']
    },
    ref_no: String,
    type_of_order:  {
        type: String,
        enum: ['market','institutional','others']
    },
    date_of_order: String,
    order_valid_untill: String,
    stage_of_purchase_order: {
        type: String,
        enum: ['advanced','confirmed']
    },
    supply_status: {
        type: String,
        enum: ['pending','partially received','completed']
    },
    entry_of_purchase_products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order_product_purchase_order'
    }]
  

}
);
module.exports = mongoose.model("purchase_order", purchase_orderSchema);