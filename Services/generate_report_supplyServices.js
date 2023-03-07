const generate_report_supplyModel = require("../models/generate_report_supplyModel");
const mongoose = require("mongoose");

// Get All generate_report_supply 
exports.getAllgenerate_report_supplys = (req, res) => {
    generate_report_supplyModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('entry_of_ordered_products')
}
// // Get generate_report_supply 
exports.getSpecificgenerate_report_supply = (req, res) => {

    const generate_report_supplyId = req.params.generate_report_supplyId;
    generate_report_supplyModel.find({ _id: generate_report_supplyId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('entry_of_ordered_products')
}
// // Get generate_report_supply 
exports.get_report_supply_by_supply_order_id = (req, res) => {

    const generate_report_supplyId = req.body.supply_order_id;
    generate_report_supplyModel.find({ supply_order_id: generate_report_supplyId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    }).populate('entry_of_ordered_products')
}


// Delete 
exports.deletegenerate_report_supply = (req, res) => {
    const generate_report_supplyId = req.params.generate_report_supplyId;
    generate_report_supplyModel.findByIdAndDelete(generate_report_supplyId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deletegenerate_report_supplyAll = (req, res) => {
    generate_report_supplyModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Update 
exports.Orderproducts_Report= async (req, res) => {
    const updateData = {
        $push:{
            entry_of_ordered_products:req.body.ordered_product_id
        },
        total_amount:req.body.total_amount
    }
    const options = {
        new: true
    }
    generate_report_supplyModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}

// Create 
exports.creategenerate_report_supply = async (req, res) => {
    const generate_report_supply = new generate_report_supplyModel({
        _id: mongoose.Types.ObjectId(),
        supply_order_id: req.body.supply_order_id,
        ref_no: req.body.ref_no,
        date_of_order: req.body.date_of_order,
        valid_upto: req.body.valid_upto,
        serial_no: req.body.serial_no,
        entry_of_ordered_products: [],
        total_amount: req.body.total_amount,

    });
    generate_report_supply.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating generate_report_supply", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            // res.sendStatus(200)
        }
    })

}
// Update 
exports.updategenerate_report_supply = async (req, res) => {
    const updateData = {
        supply_order_id: req.body.supply_order_id,
        ref_no: req.body.ref_no,
        date_of_order: req.body.date_of_order,
        valid_upto: req.body.valid_upto,
        serial_no: req.body.serial_no,
        total_amount: req.body.total_amount,
    }
    const options = {
        new: true
    }
    generate_report_supplyModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




