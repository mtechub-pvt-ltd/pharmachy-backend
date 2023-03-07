const paymentModel = require("../models/paymentsModel");
const mongoose = require("mongoose");

// Get All payment 
exports.getAllpayments = (req, res) => {
    paymentModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('payer_supplier').populate('payer_customer')
}
// // Get payment 
exports.getSpecificpayment = (req, res) => {

    const paymentId = req.params.paymentId;
    paymentModel.find({ _id: paymentId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult,error:false, message: "Get Data Successfully" ,statusCode:200})

        } catch (err) {
            res.status(200).json({ result: err,error:true, message: "Not getting Data" ,statusCode:200})
        }
    }).populate('payer_supplier').populate('payer_customer')
}
// // Get payment By Payer Type
exports.getSpecificpaymentBypayerType = (req, res) => {

    const payer_type = req.body.payer_type;
    paymentModel.find({ payer_type: payer_type }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult,error:false, message: "Get Data Successfully" ,statusCode:200})

        } catch (err) {
            res.status(200).json({ result: err,error:true, message: "Not getting Data" ,statusCode:200})
        }
    }).populate('payer_supplier').populate('payer_customer').sort({ $natural: -1 })
}

// Delete 
exports.deletepayment = (req, res) => {
    const paymentId = req.params.paymentId;
    paymentModel.findByIdAndDelete(paymentId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result,error:true, message: error.message ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "Deleted Successfully" ,statusCode:200})

        }
    })
}
// Delete All
exports.deletepaymentAll = (req, res) => {
    paymentModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Create 
exports.createpayment = async (req, res) => {
    // paymentModel.find({ name: req.body.name }, (error, result) => {
    //     if (error) {
    //         res.status(200).json({ result: error,error:true, message: "Error in payment name " ,statusCode:200})

    //     } else {
    //         if (result === undefined || result.length == 0) {
       
            const payment = new paymentModel({
                _id: mongoose.Types.ObjectId(),
                dateTime: req.body.dateTime,
                dateTimeString: req.body.dateTimeString,
                payer_type: req.body.payer_type,
                payer_customer: req.body.payer_customer,
                payer_supplier: req.body.payer_supplier,
                payment_by:req.body.payment_by,
                chequeOrInstrumentNo:req.body.chequeOrInstrumentNo,
                mode_of_payment:req.body.mode_of_payment,
                payment_amount:req.body.payment_amount,
                description:req.body.description

            });
            payment.save((error, result) => {
                if (error) {
                    res.status(200).json({ result: error,error:true, message: "Error Creating payment" ,statusCode:200})
                } else {
                    res.status(200).json({ result: result,error:false, message: "Created Successfully" ,statusCode:200})
                    // res.sendStatus(200)
                }
            })
                

    //         } else {
    //             res.status(200).json({ result: result,error:true, message: "payment Already Exists" ,statusCode:200})

    //         }
    //     }
    // })

}
// Update 
exports.updatepayment = async (req, res) => {
    const updateData = {
        dateTime: req.body.dateTime,
        dateTimeString: req.body.dateTimeString,
        payer_type: req.body.payer_type,
        payer_customer: req.body.payer_customer,
        payer_supplier: req.body.payer_supplier,
        payment_by:req.body.payment_by,
        chequeOrInstrumentNo:req.body.chequeOrInstrumentNo,
        mode_of_payment:req.body.mode_of_payment,
        payment_amount:req.body.payment_amount

    }
    const options = {
        new: true
    }
    paymentModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result,error:false, message:error.message  ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "Updated Successfully" ,statusCode:200})

        }
    })
}




