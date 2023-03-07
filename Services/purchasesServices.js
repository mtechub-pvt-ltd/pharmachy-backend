const purchasesModel = require("../models/purchasesModel");
const mongoose = require("mongoose");

// Get All purchases 
exports.getAllpurchasess = (req, res) => {
    purchasesModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('purchase_order_id').populate('supplier_id').populate('details_of_stock_received')
}
// Get All supplyOrder 
exports.getAllpurchasessSummary = async(req, res) => {
    const data = await purchasesModel.aggregate().sortByCount("sale_order_state");
            res.send(data)

    // supplyOrderModel.find({}, (error, result) => {
    //     if (error) {
    //         res.send(error)
    //     } else {
    //         res.send(result)
    //     }
    // }).sort({ $natural: -1 }).populate('entry_of_ordered_products')
}

// // Get purchases 
exports.getSpecificpurchases = (req, res) => {

    const purchasesId = req.params.purchasesId;
    purchasesModel.find({ _id: purchasesId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('purchase_order_id').populate('supplier_id').populate('details_of_stock_received')
}
// // Get purchases 
exports.getSpecificpurchasesBySupplyId = (req, res) => {

    const supplyOrderOrderId = req.params.purchase_order_id;
    purchasesModel.find({ purchase_order_id: supplyOrderOrderId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deletepurchases = (req, res) => {
    const purchasesId = req.params.purchasesId;
    purchasesModel.findByIdAndDelete(purchasesId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deletepurchasesAll = (req, res) => {
    purchasesModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createpurchases = async (req, res) => {
    // purchasesModel.find({ name: req.body.name }, (error, result) => {
    //     if (error) {
    //         res.status(200).json({ result: error,error:true, message: "Error in purchases name " ,statusCode:200})

    //     } else {
    //         if (result === undefined || result.length == 0) {
    const purchases = new purchasesModel({
        _id: mongoose.Types.ObjectId(),
        purchase_order_id: req.body.purchase_order_id,
        purchase_order_ref_no:req.body.purchase_order_ref_no,
        supplier_id: req.body.supplier_id,
        ref_no: req.body.ref_no,
        tax_warrant_invoice_no: req.body.tax_warrant_invoice_no,
        delivery_challan_no:req.body.delivery_challan_no,
        stock_receiving_dateTime:req.body.stock_receiving_dateTime,
        invoice_date:req.body.invoice_date,
        invoice_due_date:req.body.invoice_due_date,
        amount_in_Rs:req.body.amount_in_Rs,
        discount_in_Rs_and_percent:req.body.discount_in_Rs_and_percent,
        sales_tax:req.body.sales_tax,
        general_sales_tax:req.body.general_sales_tax,
        advance_tax:req.body.advance_tax,
        further_tax:req.body.further_tax,
        supplier_applicable_tax:req.body.supplier_applicable_tax,
        total_invoice_amount:req.body.total_invoice_amount,
        details_of_stock_received:[]

    });
    purchases.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating purchases", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            // res.sendStatus(200)
        }
    })

    //         } else {
    //             res.status(200).json({ result: result,error:true, message: "purchases Already Exists" ,statusCode:200})

    //         }
    //     }
    // })

}
// Update 
exports.updatepurchases = async (req, res) => {
    const updateData = {
        purchase_order_id: req.body.purchase_order_id,
        purchase_order_ref_no:req.body.purchase_order_ref_no,
        supplier_id: req.body.supplier_id,
        ref_no: req.body.ref_no,
        tax_warrant_invoice_no: req.body.tax_warrant_invoice_no,
        delivery_challan_no:req.body.delivery_challan_no,
        stock_receiving_dateTime:req.body.stock_receiving_dateTime,
        invoice_date:req.body.invoice_date,
        invoice_due_date:req.body.invoice_due_date,
        amount_in_Rs:req.body.amount_in_Rs,
        discount_in_Rs_and_percent:req.body.discount_in_Rs_and_percent,
        sales_tax:req.body.sales_tax,
        general_sales_tax:req.body.general_sales_tax,
        advance_tax:req.body.advance_tax,
        further_tax:req.body.further_tax,
        supplier_applicable_tax:req.body.supplier_applicable_tax,
        total_invoice_amount:req.body.total_invoice_amount,
    }
    const options = {
        new: true
    }
    purchasesModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}





