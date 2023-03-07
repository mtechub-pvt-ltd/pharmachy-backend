const mongoose = require("mongoose");
const accounts_balanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cash_balance:String,
    account_balance:String
}
);
module.exports = mongoose.model("accounts_balance", accounts_balanceSchema);