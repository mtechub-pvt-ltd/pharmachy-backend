const supplierModel = require("../models/supplierModel");
const mongoose = require("mongoose");

// Get All supplier 
exports.getAllsuppliers = (req, res) => {
    supplierModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get supplier 
exports.getSpecificsupplier = (req, res) => {

    const supplierId = req.params.supplierId;
    supplierModel.find({ _id: supplierId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deletesupplier = (req, res) => {
    const supplierId = req.params.supplierId;
    supplierModel.findByIdAndDelete(supplierId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deletesupplierAll = (req, res) => {
    supplierModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createsupplier = async (req, res) => {
    supplierModel.find({ phone: req.body.phone }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error in supplier phone ", statusCode: 200 })

        } else {
            if (result === undefined || result.length == 0) {
                const supplier = new supplierModel({
                    _id: mongoose.Types.ObjectId(),
                    type_of_supplier: req.body.type_of_supplier,
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    contact_person: req.body.contact_person,
                    cnic_of_propreitor: req.body.cnic_of_propreitor,
                    sales_tax_number: req.body.sales_tax_number,
                    NTN_number: req.body.NTN_number,
                    // applicable_tax: req.body.applicable_tax,
                    account_number: req.body.account_number,
                    license_number: req.body.license_number,
                    supplier_filer_status: req.body.supplier_filer_status,
                    sales_Tax: req.body.sales_Tax,
                    general_sales_Tax: req.body.general_sales_Tax,
                    advance_Tax: req.body.advance_Tax,
                    further_Tax: req.body.further_Tax,
                    Total_Tax: req.body.Total_Tax

                });
                supplier.save((error, result) => {
                    if (error) {
                        res.status(200).json({ result: error, error: true, message: "Error Creating supplier", statusCode: 200 })
                    } else {
                        res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
                        // res.sendStatus(200)
                    }
                })

            } else {
                res.status(200).json({ result: result, error: true, message: "supplier Already Exists for this Phone No", statusCode: 200 })

            }
        }
    })

}
// Update 
exports.updatesupplier = async (req, res) => {
    const updateData = {
        type_of_supplier: req.body.type_of_supplier,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        contact_person: req.body.contact_person,
        cnic_of_propreitor: req.body.cnic_of_propreitor,
        sales_tax_number: req.body.sales_tax_number,
        NTN_number: req.body.NTN_number,
        account_number: req.body.account_number,
        license_number: req.body.license_number,
        // applicable_tax: req.body.applicable_tax,
        supplier_filer_status: req.body.supplier_filer_status,
        sales_Tax: req.body.sales_Tax,
        general_sales_Tax: req.body.general_sales_Tax,
        advance_Tax: req.body.advance_Tax,
        further_Tax: req.body.further_Tax,
        Total_Tax: req.body.Total_Tax
    }
    const options = {
        new: true
    }
    supplierModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




