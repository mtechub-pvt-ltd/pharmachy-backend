const expenseModel = require("../models/expensesModel");
const mongoose = require("mongoose");

// Get All expense 
exports.getAllexpenses = (req, res) => {
    expenseModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get expense 
exports.getSpecificexpense = (req, res) => {

    const expenseId = req.params.expenseId;
    expenseModel.find({ _id: expenseId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// // Get expense 
exports.getSpecificexpenseByMode = (req, res) => {
    const sdate = req.body.startDate
    const edate = req.body.endDate
    expenseModel.find({
        $or: [
            { "dateTimeString": { "$gte": sdate, "$lte": edate } }
        ], mode_of_payment: 'cash account'
    }, (error, foundResult) => {
        if (error) {
            res.json(error)
        } else {
            let CashAcc = foundResult
            expenseModel.find({
                $or: [
                    { "dateTimeString": { "$gte": sdate, "$lte": edate } }
                ], mode_of_payment: 'bank account'
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
    // expenseModel.find({ mode_of_payment: 'cash account' }, function (err, foundResult) {
    //     try {
    //         let CashAcc=foundResult
    //         // res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })
    //         expenseModel.find({ mode_of_payment: 'bank account' }, function (err, foundResult) {
    //             try {
    //                 let BankAcc=foundResult

    //                 res.status(200).json({ CashAcc: CashAcc,BankAcc:BankAcc, error: false, message: "Get Data Successfully", statusCode: 200 })
        
    //             } catch (err) {
    //                 res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
    //             }
    //         })
    //     } catch (err) {
    //         res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
    //     }
    // })
}

// Delete 
exports.deleteexpense = (req, res) => {
    const expenseId = req.params.expenseId;
    expenseModel.findByIdAndDelete(expenseId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteexpenseAll = (req, res) => {
    expenseModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createexpense = async (req, res) => {
    const expense = new expenseModel({
        _id: mongoose.Types.ObjectId(),
        expense_id:req.body.expense_id,
        type_of_expenses: req.body.type_of_expenses,
        mode_of_payment: req.body.mode_of_payment,
        authorized_by: req.body.authorized_by,
        received_by: req.body.received_by,
        amount: req.body.amount,
        dateTime:req.body.dateTime,
        dateTimeString: new Date().toISOString(),


    });
    expense.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating expense", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
        }
    })

}
// Update 
exports.updateexpense = async (req, res) => {
    const updateData = {
        type_of_expenses: req.body.type_of_expenses,
        mode_of_payment: req.body.mode_of_payment,
        authorized_by: req.body.authorized_by,
        received_by: req.body.received_by,
        amount: req.body.amount,
    }
    const options = {
        new: true
    }
    expenseModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}
