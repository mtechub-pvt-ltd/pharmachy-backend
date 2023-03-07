const mongoose = require("mongoose");
const supply_orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stage_of_supply_order: {
        type: String,
        enum: ['advance supply order','confirmed supply order']
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    customerName:String,
    ref_no: String,
    type_of_order:  {
        type: String,
        enum: ['market','institutional','others']
    },
    supply_order_status: {
        type: String,
        enum: ['completely delivered','partially delivered','overdue']
    },
    date_of_order: String,
    order_valid_untill: String,
    special_instructions: String,
    entry_of_ordered_products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order_product'
    }],

}
);
module.exports = mongoose.model("supply_order", supply_orderSchema);