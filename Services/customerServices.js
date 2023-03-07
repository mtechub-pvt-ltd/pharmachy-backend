const customerModel = require("../models/customerModel");
const mongoose = require("mongoose");

// Get All customer 
exports.getAllcustomers = (req, res) => {
    customerModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get customer 
exports.getSpecificcustomer = (req, res) => {

    const customerId = req.params.customerId;
    customerModel.find({ _id: customerId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult,error:false, message: "Get Data Successfully" ,statusCode:200})

        } catch (err) {
            res.status(200).json({ result: err,error:true, message: "Not getting Data" ,statusCode:200})
        }
    })
}

// Delete 
exports.deletecustomer = (req, res) => {
    const customerId = req.params.customerId;
    customerModel.findByIdAndDelete(customerId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result,error:true, message: error.message ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "Deleted Successfully" ,statusCode:200})

        }
    })
}
// Delete All
exports.deleteCustomersAll = (req, res) => {
    customerModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Create 
exports.createcustomer = async (req, res) => {
    customerModel.find({ phone: req.body.phone }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error,error:true, message: "Error in customer name " ,statusCode:200})

        } else {
            if (result === undefined || result.length == 0) {
                const customer = new customerModel({
                    _id: mongoose.Types.ObjectId(),
                    type_of_customer: req.body.type_of_customer,
                    name:req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    contact_person: req.body.contact_person,
                    cnic_of_propreitor: req.body.cnic_of_propreitor,
                    account_number: req.body.account_number,
                    sales_tax_number:req.body.sales_tax_number,
                    license_number: req.body.license_number,
                    NTN_number: req.body.NTN_number,
                    customer_filer_status: req.body.customer_filer_status,
                    sales_Tax:req.body.sales_Tax,
                    general_sales_Tax:req.body.general_sales_Tax,
                    advance_Tax:req.body.advance_Tax,
                    further_Tax:req.body.further_Tax,
                    Total_Tax:req.body.Total_Tax

                });
                customer.save((error, result) => {
                    if (error) {
                        res.status(200).json({ result: error,error:true, message: "Error Creating customer" ,statusCode:200})
                    } else {
                        res.status(200).json({ result: result,error:false, message: "Created Successfully" ,statusCode:200})
                        // res.sendStatus(200)
                    }
                })

            } else {
                res.status(200).json({ result: result,error:true, message: "customer Already Exists with this phone no" ,statusCode:200})

            }
        }
    })

}
// Update 
exports.updatecustomer = async (req, res) => {
    const updateData = {
        type_of_customer: req.body.type_of_customer,
        name:req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        contact_person: req.body.contact_person,
        cnic_of_propreitor: req.body.cnic_of_propreitor,
        account_number: req.body.account_number,
        sales_tax_number:req.body.sales_tax_number,
        license_number: req.body.license_number,
        NTN_number: req.body.NTN_number,
        customer_filer_status: req.body.customer_filer_status,
        sales_Tax:req.body.sales_Tax,
        general_sales_Tax:req.body.general_sales_Tax,
        advance_Tax:req.body.advance_Tax,
        further_Tax:req.body.further_Tax,
        Total_Tax:req.body.Total_Tax
    }
    const options = {
        new: true
    }
    customerModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result,error:false, message:error.message  ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "Updated Successfully" ,statusCode:200})

        }
    })
}




