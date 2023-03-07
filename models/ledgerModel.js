const mongoose = require("mongoose");
const ledger_customerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    balance_account_sheet:Array,
    Balance_OverDue:String,
    Status:{
        type: String,
        enum: ['overdue','paid']
    },
    // date 
    invoices:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'invoice'
    }],
    

   
}
);
module.exports = mongoose.model("ledger_customer", ledger_customerSchema);