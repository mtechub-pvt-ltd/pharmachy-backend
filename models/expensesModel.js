const mongoose = require("mongoose");
const expensesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type_of_expenses:String,
    expense_id:String,
    mode_of_payment:{
        type: String,
        enum: ['cash account','bank account']
    },
    authorized_by:String,
    received_by:String,
    amount:String,
    dateTime:String,
    dateTimeString:String
}
);
module.exports = mongoose.model("expenses", expensesSchema);