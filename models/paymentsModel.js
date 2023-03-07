const mongoose = require("mongoose");
const paymentsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateTime:String,
    dateTimeString:String,
    description:String,
    payer_type:{
        type: String,
        enum: ['sales Incoming','purchase outgoing']
    },
    payer_customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    payer_supplier:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supplier'
    }, 
    payment_by:{
        type: String,
        enum: ['cash','cheque','demand draft','pay order']
    },
    chequeOrInstrumentNo:String,
    mode_of_payment:{
        type: String,
        enum: ['cash account','bank account']
    },
    payment_amount:String
}
);
module.exports = mongoose.model("payments", paymentsSchema);