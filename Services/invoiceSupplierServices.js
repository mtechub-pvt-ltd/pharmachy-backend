const invoiceSupplierModel = require("../models/invoiceSupplierModel");
const mongoose = require("mongoose");

// Get All invoice 
exports.getAllinvoices = (req, res) => {
    invoiceSupplierModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
        .populate('supplier_id')
        .populate('purchase_order')
        .populate('purchases')




}
// // Get invoice 
exports.getSpecificinvoice = (req, res) => {
    const invoiceId = req.params.invoiceId;
    invoiceSupplierModel.find({ _id: invoiceId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('supplier_id')
        .populate('purchase_order')
        .populate('purchases')
}
// // Get invoice 
exports.getSpecificinvoiceByDate = (req, res) => {
    const invoice_dateData = req.body.invoice_date;
    console.log(invoice_dateData)
    invoiceSupplierModel.find({ invoice_date: invoice_dateData }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('supplier_id')
        .populate('purchase_order')
        .populate('purchases')
}
// // Get invoice 
exports.getSpecificinvoiceByStatus = (req, res) => {
    const invoice_dateData = req.body.invoice_status;
    console.log(invoice_dateData)
    invoiceSupplierModel.find({ invoice_status: invoice_dateData }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('supplier_id')
        .populate('purchase_order')
        .populate('purchases')
}


// Delete 
exports.deleteinvoice = (req, res) => {
    const invoiceId = req.params.invoiceId;
    invoiceSupplierModel.findByIdAndDelete(invoiceId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteinvoiceAll = (req, res) => {
    invoiceSupplierModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createinvoice = async (req, res) => {
        const invoice = new invoiceSupplierModel({
            _id: mongoose.Types.ObjectId(),
            invoice_number: req.body.invoice_number,
            tax_warrant_invoice_no: req.body.tax_warrant_invoice_no,
            delivery_challan_no: req.body.delivery_challan_no,
            stock_receiving_dateTime: req.body.stock_receiving_dateTime,
            purchase_order_ref_no: req.body.purchase_order_ref_no,
            purchase_order_date: req.body.purchase_order_date,
            invoice_date: req.body.invoice_date,
            invoice_due_date: req.body.invoice_due_date,
            supplier_id: req.body.supplier_id,
            supplier_name: req.body.supplier_name,
            discount_in_Rs_and_percent: req.body.discount_in_Rs_and_percent,
            purchase_order: req.body.purchase_order,
            purchases: req.body.purchases,
            sales_tax: req.body.sales_tax,
            general_sales_tax: req.body.general_sales_tax,
            advance_tax: req.body.advance_tax,
            further_tax: req.body.further_tax,
            Tax_amount: req.body.Tax_amount,
            invoice_status: req.body.invoice_status,
            total_payable: req.body.total_payable
        });
        invoice.save((error, result) => {
            if (error) {
                res.status(200).json({ result: error, error: true, message: "Error Creating invoice", statusCode: 200 })
            } else {
                res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            }
        })
      

}
// Update 
exports.updateinvoiceSaleOrders = async (req, res) => {
    const updateData = {
        $push: {
            sale_orders: req.body.sale_order_id,
        },
        Tax_amount: req.body.Tax_amount,
        invoice_status: req.body.invoice_status,
        total_payable: req.body.total_payable,
        notes: req.body.notes

    }
    const options = {
        new: true
    }
    invoiceSupplierModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}


// Update 
exports.updateinvoice = async (req, res) => {
    const updateData = {
        invoice_number: req.body.invoice_number,
        tax_warrant_invoice_no: req.body.tax_warrant_invoice_no,
        delivery_challan_no: req.body.delivery_challan_no,
        stock_receiving_dateTime: req.body.stock_receiving_dateTime,
        purchase_order_ref_no: req.body.purchase_order_ref_no,
        purchase_order_date: req.body.purchase_order_date,
        invoice_date: req.body.invoice_date,
        invoice_due_date: req.body.invoice_due_date,
        supplier_id: req.body.supplier_id,
        supplier_name: req.body.supplier_name,
        discount_in_Rs_and_percent: req.body.discount_in_Rs_and_percent,
        purchase_order: req.body.purchase_order,
        purchases: req.body.purchases,
        sales_tax: req.body.sales_tax,
        general_sales_tax: req.body.general_sales_tax,
        advance_tax: req.body.advance_tax,
        further_tax: req.body.further_tax,
        Tax_amount: req.body.Tax_amount,
        invoice_status: req.body.invoice_status,
        total_payable: req.body.total_payable

    }
    const options = {
        new: true
    }
    invoiceSupplierModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




