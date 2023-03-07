const accountModel = require("../models/accountsModel");
const mongoose = require("mongoose");

// Get All account 
exports.getAllaccounts = (req, res) => {
    accountModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get All account 
exports.getAllaccountsReportByDateRange = (req, res) => {
    const sdate = req.body.startDate
    const edate = req.body.endDate
    accountModel.find({
        $or: [
            { "dateTimeString": { "$gte": sdate, "$lte": edate } }
        ], account_type: 'cash account'
    }, (error, foundResult) => {
        if (error) {
            res.json(error)

        } else {
            let CashAcc = foundResult
            accountModel.find({
                $or: [
                    { "dateTimeString": { "$gte": sdate, "$lte": edate } }
                ], account_type: 'bank account'
            }, (error, foundResult) => {
                if (error) {
                    res.json(error)

                } else {
                    let BankAcc = foundResult

                    res.json({ CashAcc: CashAcc, BankAcc: BankAcc })
                }
            })

        }
    })
}
// // Get account 
exports.getSpecificaccount = (req, res) => {

    const accountId = req.params.accountId;
    accountModel.find({ _id: accountId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// // Get account 
exports.getTotalAccountsByType = (req, res) => {

    const account_type = req.body.account_type;
    accountModel.find({ account_type: account_type, typeSales: 'Incoming' }, function (err, foundResult) {
        try {
            let IncomingTrans = foundResult
            let sum = 0
            let Total = 0

            for (let i = 0; i < foundResult.length; i++) {
                sum = parseInt(sum) + parseInt(foundResult[i].Amount)
            }
            accountModel.find({ account_type: account_type, typeSales: 'Outgoing' }, function (err, foundResult) {
                try {
                    let OutgoingTrans = foundResult

                    let sumOut = 0
                    for (let i = 0; i < foundResult.length; i++) {
                        sumOut = parseInt(sumOut) + parseInt(foundResult[i].Amount)
                    }
                    Total = parseInt(Total) + parseInt(sum) - parseInt(sumOut)
                    console.log(sum)
                    console.log(sumOut)
                    console.log(Total)
                    res.status(200).json({ result: Total, IncomingCashAccounts: IncomingTrans, OutgoingTrans: OutgoingTrans, error: false, message: "Get Data Successfully", statusCode: 200 })
                } catch (err) {
                    res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
                }
            })
        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// // Get account by type
exports.getAccountByType = (req, res) => {

    const account_type = req.body.account_type;
    accountModel.find({ account_type: account_type }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).sort({ $natural: -1 })
}

// Delete 
exports.deleteaccount = (req, res) => {
    const accountId = req.params.accountId;
    accountModel.findByIdAndDelete(accountId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteaccountAll = (req, res) => {
    accountModel.deleteMany({}, (error, result) => {
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
    const account = new accountModel({
        _id: mongoose.Types.ObjectId(),
        dateTime: req.body.dateTime,
        dateTimeString: new Date().toISOString(),
        account_type: req.body.account_type,
        Amount: req.body.Amount,
        transaction_id: req.body.transaction_id,
        typeSales: req.body.typeSales,
        Reason: req.body.Reason

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
        dateTime: req.body.dateTime,
        account_type: req.body.account_type,
        Amount: req.body.Amount,
        transaction_id: req.body.transaction_id,
        typeSales: req.body.typeSales,
        Reason: req.body.Reason

    }
    const options = {
        new: true
    }
    accountModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




