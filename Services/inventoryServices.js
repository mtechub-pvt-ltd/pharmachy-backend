const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");
const companyModel = require("../models/company");

// Get All inventory 
exports.getAllinventorys = (req, res) => {
    inventoryModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get inventory 
exports.getSpecificinventory = (req, res) => {
    const inventoryId = req.params.inventoryId;
    inventoryModel.find({ _id: inventoryId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// // Get inventory by Product Name 
exports.getSpecificinventoryByProduct = (req, res) => {
    const item_name = req.body.item_name;
    inventoryModel.find({ "item_name": { $regex: item_name, $options: 'i' } }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// // Get inventory by generic name
exports.getSpecificinventoryByGenericname = (req, res) => {
    const generic_name = req.body.generic_name;
    inventoryModel.find({ "generic_name": { $regex: generic_name, $options: 'i' } }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// // Get inventory by company name
exports.getSpecificinventoryByCompanyName = (req, res) => {
    const company_name = req.body.company_name;
    inventoryModel.find({ "company_name": { $regex: company_name, $options: 'i' }  }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })
        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// // Get inventory by trade price
exports.getSpecificinventoryByTP = (req, res) => {

    const t_p = req.body.t_p;
    inventoryModel.find({ "t_p": { $regex: t_p, $options: 'i' } }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deleteinventory = (req, res) => {
    const inventoryId = req.params.inventoryId;
    inventoryModel.findByIdAndDelete(inventoryId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deleteInventoryAll = (req, res) => {
    inventoryModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error,error:true, message: "Some Error " ,statusCode:200})

        } else {
            res.status(200).json({ result: result,error:false, message: "All Record Deleted Successful " ,statusCode:200})

        }
    })
}
// Create 
exports.createinventory = async (req, res) => {
    companyModel.find({ _id: req.body.company_id }, (error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error in company id ", statusCode: 200 })
        } else {
            const CompanyName = result[0].name;
            const inventory = new inventoryModel({
                _id: mongoose.Types.ObjectId(),
                company_id: req.body.company_id,
                company_name: CompanyName,
                item_name: req.body.item_name,
                item_code: req.body.item_code,
                pack_size: req.body.pack_size,
                registration_no: req.body.registration_no,
                generic_name: req.body.generic_name,
                expiry_date: req.body.expiry_date,
                batch_no: req.body.batch_no,
                m_r_p: req.body.m_r_p,
                t_p: req.body.t_p,

            });
            inventory.save((error, result) => {
                if (error) {
                    res.status(200).json({ result: error, error: true, message: "Error Creating inventory", statusCode: 200 })
                } else {
                    res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
                }
            })

        }
    })



}
// Update 
exports.updateinventory = async (req, res) => {
    const updateData = {
        company_id: req.body.company_id,
        item_name: req.body.item_name,
        item_code: req.body.item_code,
        pack_size: req.body.pack_size,
        registration_no: req.body.registration_no,
        generic_name: req.body.generic_name,
        expiry_date: req.body.expiry_date,
        batch_no: req.body.batch_no,
        m_r_p: req.body.m_r_p,
        t_p: req.body.t_p,

    }
    const options = {
        new: true
    }
    inventoryModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




