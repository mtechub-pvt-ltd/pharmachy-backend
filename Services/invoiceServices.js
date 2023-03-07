const invoiceModel = require("../models/invoiceModel");
const mongoose = require("mongoose");

// Get All invoice 
exports.getAllinvoices = (req, res) => {
    invoiceModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
        .populate('booked_by')
        .populate('delivered_by')
        .populate('customer_id')
        .populate('supply_order')
        .populate('sale_orders')




}
// // Get invoice 
exports.getSpecificinvoice = (req, res) => {
    const invoiceId = req.params.invoiceId;
    invoiceModel.find({ _id: invoiceId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('booked_by')
        .populate('delivered_by')
        .populate('customer_id')
        .populate('supply_order')
        // .populate('sale_orders')
        .populate({ 
            path: 'sale_orders',
            populate: {
              path: 'entry_of_ordered_products',
              model: 'order_product_sales'
            } 
         })
}
// // Get invoice 
exports.getSpecificinvoiceByDate = (req, res) => {
    const invoice_dateData = req.body.invoice_date;
    console.log(invoice_dateData)
    invoiceModel.find({ invoice_date: invoice_dateData }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('booked_by')
        .populate('delivered_by')
        .populate('customer_id')
        .populate('supply_order')
        .populate('sale_orders')
}
// // Get invoice 
exports.getSpecificinvoiceByStatus = (req, res) => {
    const invoice_dateData = req.body.invoice_status;
    console.log(invoice_dateData)
    invoiceModel.find({ invoice_status: invoice_dateData }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('booked_by')
        .populate('delivered_by')
        .populate('customer_id')
        .populate('supply_order')
        .populate('sale_orders')
}


// Delete 
exports.deleteinvoice = (req, res) => {
    const invoiceId = req.params.invoiceId;
    invoiceModel.findByIdAndDelete(invoiceId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteinvoiceAll = (req, res) => {
    invoiceModel.deleteMany({}, (error, result) => {
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
      const DeliveredBy=req.body.delivered_by
      if(DeliveredBy===''){
        const invoice = new invoiceModel({
            _id: mongoose.Types.ObjectId(),
            type_of_invoice: req.body.type_of_invoice,
            invoice_number: req.body.invoice_number,
            supply_order_ref_no: req.body.supply_order_ref_no,
            supply_order_date: req.body.supply_order_date,
            invoice_date: req.body.invoice_date,
            due_date: req.body.due_date,
            delivery_challan_no: req.body.delivery_challan_no,
            booked_by: req.body.booked_by,
            courier_ref_track_no: req.body.courier_ref_track_no,
            customer_id: req.body.customer_id,
            customer_NIC: req.body.customer_NIC,
            customer_name:req.body.customer_name,
            customer_sales_tax_reg_no: req.body.customer_sales_tax_reg_no,
            supply_order: req.body.supply_order,
            sale_orders: [],
            sales_tax: req.body.sales_tax,
            general_sales_tax: req.body.general_sales_tax,
            advance_tax: req.body.advance_tax,
            further_tax: req.body.further_tax,
            Tax_amount: req.body.Tax_amount,
            invoice_status: req.body.invoice_status,
            total_payable: req.body.total_payable,
            notes: req.body.notes
    
        });
        invoice.save((error, result) => {
            if (error) {
                res.status(200).json({ result: error, error: true, message: "Error Creating invoice", statusCode: 200 })
            } else {
                res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            }
        })
      }else{
        const invoice = new invoiceModel({
            _id: mongoose.Types.ObjectId(),
            type_of_invoice: req.body.type_of_invoice,
            invoice_number: req.body.invoice_number,
            supply_order_ref_no: req.body.supply_order_ref_no,
            supply_order_date: req.body.supply_order_date,
            invoice_date: req.body.invoice_date,
            due_date: req.body.due_date,
            delivery_challan_no: req.body.delivery_challan_no,
            booked_by: req.body.booked_by,
            delivered_by: req.body.delivered_by,
            courier_ref_track_no: req.body.courier_ref_track_no,
            customer_id: req.body.customer_data,
            customer_NIC: req.body.customer_NIC,
            customer_name:req.body.customer_name,
            customer_sales_tax_reg_no: req.body.customer_sales_tax_reg_no,
            supply_order: req.body.supply_order,
            sale_orders: [],
            sales_tax: req.body.sales_tax,
            general_sales_tax: req.body.general_sales_tax,
            advance_tax: req.body.advance_tax,
            further_tax: req.body.further_tax,
            Tax_amount: req.body.Tax_amount,
            invoice_status: req.body.invoice_status,
            total_payable: req.body.total_payable,
            notes: req.body.notes
        });
        invoice.save((error, result) => {
            if (error) {
                res.status(200).json({ result: error, error: true, message: "Error Creating invoice", statusCode: 200 })
            } else {
                res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            }
        })
      }
    



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
    invoiceModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
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
        type_of_invoice: req.body.type_of_invoice,
        invoice_number: req.body.invoice_number,
        invoice_date: req.body.invoice_date,
        due_date: req.body.due_date,
        delivery_challan_no: req.body.delivery_challan_no,
        courier_ref_track_no: req.body.courier_ref_track_no,
        booked_by: req.body.booked_by,
        delivered_by: req.body.delivered_by,
        Tax_amount: req.body.Tax_amount,
        invoice_status: req.body.invoice_status,
        total_payable: req.body.total_payable,
        notes: req.body.notes

    }
    const options = {
        new: true
    }
    invoiceModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




