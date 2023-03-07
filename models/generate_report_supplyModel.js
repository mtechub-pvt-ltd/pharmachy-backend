const mongoose = require("mongoose");
const generate_report_supplySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    supply_order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supply_order'
    },
    ref_no:String,
    date_of_order:String,
    valid_upto:String,
    serial_no:String,
    entry_of_ordered_products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order_product'
    }],
    total_amount:String,

}
);
module.exports = mongoose.model("generate_report_supply", generate_report_supplySchema);