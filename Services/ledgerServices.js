const ledgerModel = require("../models/ledgerModel");
const mongoose = require("mongoose");
const invoiceModel = require("../models/invoiceModel");

// Get All ledger 
exports.getAllledgers = (req, res) => {
    ledgerModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get ledger 
exports.getSpecificledger = (req, res) => {

    const customer_id = req.body.customer_id;
    ledgerModel.find({ customer_id: customer_id }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('customer_id').populate('invoices')
}

// Delete 
exports.deleteledger = (req, res) => {
    const ledgerId = req.params.ledgerId;
    ledgerModel.findByIdAndDelete(ledgerId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteledgerAll = (req, res) => {
    ledgerModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createledger = async (req, res) => {
    let amountPaid = req.body.amount;
    let BalanceAccountSheet = []
    ledgerModel.find({ customer_id: req.body.customer_id }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error in ledger name ", statusCode: 200 })

        } else {
            if (result === undefined || result.length == 0) {
                let InvoiceIdArray = []
                invoiceModel.find({ customer_id: req.body.customer_id }, function (err, foundResult) {
                    try {
                        let overdueAmount = 0;
                        let Partial_Paid = 0;

                        let Total_Amount_Payable_Customer = 0

                        for (let i = 0; i < foundResult.length; i++) {
                            Total_Amount_Payable_Customer = parseInt(Total_Amount_Payable_Customer) + parseInt(foundResult[i].total_payable)
                            let tempCalculation = 0;
                            console.log(i)
                            const invoiceIdCurrent = foundResult[i]._id
                            let totalPayable = foundResult[i].total_payable;

                            console.log(totalPayable)
                            if (parseInt(amountPaid) === 0) {
                                console.log('end ')
                                tempCalculation = parseInt(tempCalculation) + parseInt(totalPayable)
                                overdueAmount = parseInt(overdueAmount) + parseInt(tempCalculation)
                                console.log(overdueAmount)
                            } else if (parseInt(amountPaid) < parseInt(totalPayable)) {
                                console.log('less amount')
                                console.log(amountPaid)
                                // overdueAmount=parseInt(overdueAmount)+parseInt(totalPayable)
                                let tempLess;

                                tempLess = parseInt(totalPayable) - parseInt(amountPaid)
                                // console.log(amountPaid) //18056
                                Partial_Paid = parseInt(totalPayable) - parseInt(tempLess)
                                overdueAmount = parseInt(overdueAmount) + parseInt(tempLess)
                                // console.log(overdueAmount)
                                amountPaid = 0
                                InvoiceIdArray.push(invoiceIdCurrent)

                                //    Partially Paid 
                                const updateData = {
                                    invoice_status: 'partially paid',
                                }
                                const options = {
                                    new: true
                                }
                                invoiceModel.findByIdAndUpdate(invoiceIdCurrent, updateData, options, (error, result) => {
                                    if (error) {
                                        res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })
                                    } else {
                                        // res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })
                                    }
                                })

                            } else if (parseInt(amountPaid) == parseInt(totalPayable)) {
                                console.log('equal amount')
                                let tempLess;
                                tempLess = parseInt(amountPaid) - parseInt(totalPayable)
                                overdueAmount = parseInt(overdueAmount) + parseInt(tempLess)
                                amountPaid = 0;
                                // Paid 
                                const updateData = {
                                    invoice_status: 'paid',
                                }
                                const options = {
                                    new: true
                                }
                                InvoiceIdArray.push(invoiceIdCurrent)

                                invoiceModel.findByIdAndUpdate(invoiceIdCurrent, updateData, options, (error, result) => {
                                    if (error) {
                                        res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

                                    } else {

                                    }
                                })
                            } else {
                                console.log('greater')
                                let tempLess;
                                tempLess = parseInt(amountPaid) - parseInt(totalPayable)
                                // overdueAmount=parseInt(overdueAmount)+parseInt(tempLess)
                                overdueAmount = 0
                                console.log(tempLess)
                                amountPaid = tempLess
                                //    Paid 
                                const updateData = {
                                    invoice_status: 'paid',
                                }
                                const options = {
                                    new: true
                                }
                                InvoiceIdArray.push(invoiceIdCurrent)

                                invoiceModel.findByIdAndUpdate(invoiceIdCurrent, updateData, options, (error, result) => {
                                    if (error) {
                                        res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

                                    } else {
                                        // res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })
                                    }
                                })
                            }
                        }
                        console.log(`Amount Overdue:${overdueAmount}`)
                        console.log(`Total customer Payable : ${Total_Amount_Payable_Customer}`)
                        let id_Unique = Math.floor((Math.random() * 1000000) + 1);
                        console.log('Invoice ids ')
                        console.log(InvoiceIdArray)

                        BalanceAccountSheet.push({
                            id: id_Unique,
                            date: req.body.dateTime,
                            Amount: parseInt(Total_Amount_Payable_Customer),
                            Debit: req.body.amount,
                            Credit: overdueAmount,
                            Partial_Paid: Partial_Paid,
                        })
                        // Ledger Add 
                        let status = ''
                        if (overdueAmount === 0) {
                            status = 'paid'
                        } else {
                            status = 'overdue'

                        }
                        // start 
                        const ledger = new ledgerModel({
                            _id: mongoose.Types.ObjectId(),
                            customer_id: req.body.customer_id,
                            balance_account_sheet: BalanceAccountSheet,
                            Balance_OverDue: overdueAmount,
                            Status: status,
                            invoices: InvoiceIdArray


                        });
                        ledger.save((error, result) => {
                            if (error) {
                                res.status(200).json({ result: error, error: true, message: "Error Creating ledger", statusCode: 200 })
                            } else {
                                res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
                                // res.sendStatus(200)
                            }
                        })
                        // end 
                        // res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

                    } catch (err) {
                        res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
                    }
                })
            } else {
                let InvoiceIdArray = result[0].invoices

                let IdLedger = result[0]._id
                BalanceAccountSheet = result[0].balance_account_sheet
                BalanceAccountSheet1 = result[0].balance_account_sheet


                console.log(BalanceAccountSheet)

                invoiceModel.find({ customer_id: req.body.customer_id, $or: [{ invoice_status: 'partially paid' }, { invoice_status: 'no paid' }, { invoice_status: 'overdue' }] }, function (err, foundResult) {
                    try {
                        let overdueAmount = 0;
                        let Partial_Paid = 0;
                        let Total_Amount_Payable_Customer = 0

                        for (let i = 0; i < foundResult.length; i++) {
                            Total_Amount_Payable_Customer = parseInt(Total_Amount_Payable_Customer) + parseInt(foundResult[i].total_payable)
                            const invoiceIdCurrent = foundResult[i]._id
                            let tempCalculation = 0;
                            if (foundResult[i].invoice_status === "partially paid") {
                                let partial_Last_Array = 0
                                let partial_Value = 0
                                console.log(i)
                                console.log('partial paid')
                                partial_Last_Array = BalanceAccountSheet1[BalanceAccountSheet1.length - 1];
                                partial_Value = partial_Last_Array.Partial_Paid
                                console.log(partial_Last_Array)
                                console.log(partial_Value)
                                let totalPayable = foundResult[i].total_payable;
                                totalPayable = parseInt(totalPayable) - parseInt(partial_Value)
                                console.log(`partial paid ${totalPayable}`)
                                if (parseInt(amountPaid) === 0) {
                                    console.log('end ')
                                    tempCalculation = parseInt(tempCalculation) + parseInt(totalPayable)
                                    overdueAmount = parseInt(overdueAmount) + parseInt(tempCalculation)
                                    console.log(overdueAmount)
                                } else if (parseInt(amountPaid) < parseInt(totalPayable)) {
                                    console.log('less amount')
                                    console.log(amountPaid)
                                    // overdueAmount=parseInt(overdueAmount)+parseInt(totalPayable)
                                    let tempLess;

                                    tempLess = parseInt(totalPayable) - parseInt(amountPaid)
                                    // console.log(amountPaid) //18056
                                    Partial_Paid = tempLess
                                    overdueAmount = parseInt(overdueAmount) + parseInt(tempLess)
                                    // console.log(overdueAmount)
                                    amountPaid = 0
                                    //    Partially Paid 
                                InvoiceIdArray.push(invoiceIdCurrent)

                                    const updateData = {
                                        invoice_status: 'partially paid',
                                    }
                                    const options = {
                                        new: true
                                    }
                                    invoiceModel.findByIdAndUpdate(invoiceIdCurrent, updateData, options, (error, result) => {
                                        if (error) {
                                            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })
                                        } else {
                                            // res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })
                                        }
                                    })

                                } else if (parseInt(amountPaid) == parseInt(totalPayable)) {
                                    console.log('equal amount')
                                    let tempLess;
                                    tempLess = parseInt(amountPaid) - parseInt(totalPayable)
                                    overdueAmount = parseInt(overdueAmount) + parseInt(tempLess)
                                    amountPaid = 0;
                                    // Paid 
                                    InvoiceIdArray.push(invoiceIdCurrent)

                                    const updateData = {
                                        invoice_status: 'paid',
                                    }
                                    const options = {
                                        new: true
                                    }
                                    invoiceModel.findByIdAndUpdate(invoiceIdCurrent, updateData, options, (error, result) => {
                                        if (error) {
                                            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

                                        } else {

                                        }
                                    })
                                } else {
                                    console.log('greater')
                                    let tempLess;
                                    tempLess = parseInt(amountPaid) - parseInt(totalPayable)
                                    // overdueAmount=parseInt(overdueAmount)+parseInt(tempLess)
                                    overdueAmount = 0
                                    console.log(tempLess)
                                    amountPaid = tempLess
                                    //    Paid 
                                    InvoiceIdArray.push(invoiceIdCurrent)

                                    const updateData = {
                                        invoice_status: 'paid',
                                    }
                                    const options = {
                                        new: true
                                    }
                                    invoiceModel.findByIdAndUpdate(invoiceIdCurrent, updateData, options, (error, result) => {
                                        if (error) {
                                            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

                                        } else {
                                            // res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })
                                        }
                                    })
                                }

                            } else {
                                console.log(i)
                                console.log('no paid')
                                let totalPayable = foundResult[i].total_payable;
                                console.log(`no paid ${totalPayable}`)
                                if (parseInt(amountPaid) === 0) {
                                    console.log('end ')
                                    tempCalculation = parseInt(tempCalculation) + parseInt(totalPayable)
                                    overdueAmount = parseInt(overdueAmount) + parseInt(tempCalculation)
                                    console.log(overdueAmount)
                                } else if (parseInt(amountPaid) < parseInt(totalPayable)) {
                                    console.log('less amount')
                                    console.log(amountPaid)
                                    // overdueAmount=parseInt(overdueAmount)+parseInt(totalPayable)
                                    let tempLess;

                                    tempLess = parseInt(totalPayable) - parseInt(amountPaid)
                                    // console.log(amountPaid) //18056
                                    Partial_Paid = parseInt(totalPayable) - parseInt(tempLess)

                                    // Partial_Paid = tempLess
                                    overdueAmount = parseInt(overdueAmount) + parseInt(tempLess)
                                    // console.log(overdueAmount)
                                    amountPaid = 0
                                    //    Partially Paid 
                                    InvoiceIdArray.push(invoiceIdCurrent)

                                    const updateData = {
                                        invoice_status: 'partially paid',
                                    }
                                    const options = {
                                        new: true
                                    }
                                    invoiceModel.findByIdAndUpdate(invoiceIdCurrent, updateData, options, (error, result) => {
                                        if (error) {
                                            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })
                                        } else {
                                            // res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })
                                        }
                                    })

                                } else if (parseInt(amountPaid) == parseInt(totalPayable)) {
                                    console.log('equal amount')
                                    let tempLess;
                                    tempLess = parseInt(amountPaid) - parseInt(totalPayable)
                                    overdueAmount = parseInt(overdueAmount) + parseInt(tempLess)
                                    amountPaid = 0;
                                    // Paid 
                                    InvoiceIdArray.push(invoiceIdCurrent)

                                    const updateData = {
                                        invoice_status: 'paid',
                                    }
                                    const options = {
                                        new: true
                                    }
                                    invoiceModel.findByIdAndUpdate(invoiceIdCurrent, updateData, options, (error, result) => {
                                        if (error) {
                                            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

                                        } else {

                                        }
                                    })
                                } else {
                                    console.log('greater')
                                    let tempLess;
                                    tempLess = parseInt(amountPaid) - parseInt(totalPayable)
                                    // overdueAmount=parseInt(overdueAmount)+parseInt(tempLess)
                                    overdueAmount = 0
                                    console.log(tempLess)
                                    amountPaid = tempLess
                                    //    Paid 
                                    InvoiceIdArray.push(invoiceIdCurrent)

                                    const updateData = {
                                        invoice_status: 'paid',
                                    }
                                    const options = {
                                        new: true
                                    }
                                    invoiceModel.findByIdAndUpdate(invoiceIdCurrent, updateData, options, (error, result) => {
                                        if (error) {
                                            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

                                        } else {
                                            // res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })
                                        }
                                    })
                                }



                            }
                        }
                        //   Ledger 
                        console.log(`Amount Overdue:${overdueAmount}`)
                        console.log(`Total customer Payable : ${Total_Amount_Payable_Customer}`)
                        let id_Unique = Math.floor((Math.random() * 1000000) + 1);

                        BalanceAccountSheet.push({
                            id: id_Unique,
                            date: req.body.dateTime,
                            Amount: parseInt(Total_Amount_Payable_Customer),
                            Debit: req.body.amount,
                            Credit: overdueAmount,
                            Partial_Paid: Partial_Paid,

                        })
                        console.log(BalanceAccountSheet)

                        //    res.json(BalanceAccountSheet)
                        // Ledger Add 
                        let status = ''
                        if (overdueAmount === 0) {
                            status = 'paid'
                        } else {
                            status = 'overdue'

                        }
                        // start 
                        const updateData = {
                            customer_id: req.body.customer_id,
                            balance_account_sheet: BalanceAccountSheet,
                            Balance_OverDue: overdueAmount,
                            Status: status,
                            invoices: InvoiceIdArray

                        }
                        const options = {
                            new: true
                        }
                        ledgerModel.findByIdAndUpdate(IdLedger, updateData, options, (error, result) => {
                            if (error) {
                                res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

                            } else {
                                res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

                            }
                        })
                        // const ledger = new ledgerModel({
                        //     _id: mongoose.Types.ObjectId(),
                        //     customer_id: req.body.customer_id,
                        //     balance_account_sheet: BalanceAccountSheet,
                        //     Balance_OverDue: overdueAmount,
                        //     Status: status

                        // });
                        // ledger.save((error, result) => {
                        //     if (error) {
                        //         res.status(200).json({ result: error, error: true, message: "Error Creating ledger", statusCode: 200 })
                        //     } else {
                        //         res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
                        //         // res.sendStatus(200)
                        //     }
                        // })
                        // res.status(200).json({ result: foundResult, error: true, message: "Not getting Data", statusCode: 200 })


                    } catch (err) {
                        res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
                    }
                })

            }
        }
    })

}
// Update 
exports.updateledger = async (req, res) => {
    const updateData = {
        name: req.body.name,
        address: req.body.address,
        zip_code: req.body.zip_code,
        phone: req.body.phone,
        fax: req.body.fax,
    }
    const options = {
        new: true
    }
    ledgerModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




