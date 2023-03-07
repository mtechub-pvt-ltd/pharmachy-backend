const mongoose = require("mongoose");
const ledger_supplierSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    supplier_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'supplier'
    },
    balance_account_sheet:Array,

    Balance_OverDue:String,
    // Debit_Total:String,
    // Credit_Total:String,
    Status:{
        type: String,
        enum: ['overdue','paid']
    },
    invoices:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'invoiceSupplier'
    }],
    // invoices:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'invoice'
    // }],
    

   
}
);
module.exports = mongoose.model("ledger_supplier", ledger_supplierSchema);