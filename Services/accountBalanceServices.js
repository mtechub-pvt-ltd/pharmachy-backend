const accountBalanceModel = require("../models/accountBalanceModel");
const mongoose = require("mongoose");

// Get All account 
exports.getAllaccounts = (req, res) => {
    accountBalanceModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get account 
exports.getSpecificaccount = (req, res) => {

    const accountId = req.params.accountId;
    accountBalanceModel.find({ _id: accountId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deleteaccount = (req, res) => {
    const accountId = req.params.accountId;
    accountBalanceModel.findByIdAndDelete(accountId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteaccountAll = (req, res) => {
    accountBalanceModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createaccount = async (req, res) => {
    const account = new accountBalanceModel({
        _id: mongoose.Types.ObjectId(),
        cash_balance:req.body.cash_balance,
        account_balance:req.body.account_balance,
    });
    account.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating account", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            // res.sendStatus(200)
        }
    })

}
// Update 
exports.updateaccount = async (req, res) => {
    const updateData = {
        cash_balance:req.body.cash_balance,
        account_balance:req.body.account_balance
    }
    const options = {
        new: true
    }
    accountBalanceModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




