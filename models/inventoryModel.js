const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    company_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    company_name:String,
    item_name:String,
    item_code:String,
    pack_size:String,
    registration_no:String,
    generic_name:String,
    expiry_date:String,
    batch_no:String,
    m_r_p:String,
    t_p:String,

}
);
module.exports = mongoose.model("inventory", inventorySchema);