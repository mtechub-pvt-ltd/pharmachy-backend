const mongoose = require("mongoose");
const accountsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateTime:String,
    dateTimeString:String,
    account_type:{
        type: String,
        enum: ['cash account','bank account']
    },
    Amount:String,
    Reason:String,
    transaction_id:String,
    typeSales:{
        type: String,
        enum: ['Incoming','Outgoing']
    }
}
);
module.exports = mongoose.model("accounts", accountsSchema);