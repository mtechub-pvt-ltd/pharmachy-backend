const reportModel = require("../models/reportsModel");
const mongoose = require("mongoose");

// Get All report 
exports.getAllreports = (req, res) => {
    reportModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get report 
exports.getSpecificreport = (req, res) => {

    const reportId = req.params.reportId;
    reportModel.find({ _id: reportId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// // Get report by role
exports.getSpecificreportByRoles = (req, res) => {

    const Roles = req.body.report_type;
    reportModel.find({ report_type: Roles }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}

// Delete 
exports.deletereport = (req, res) => {
    const reportId = req.params.reportId;
    reportModel.findByIdAndDelete(reportId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })

        }
    })
}
// Delete All
exports.deletereportAll = (req, res) => {
    reportModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createreport = async (req, res) => {
    // reportModel.find({ name: req.body.name }, (error, result) => {
    //     if (error) {
    //         res.status(200).json({ result: error,error:true, message: "Error in report name " ,statusCode:200})

    //     } else {
    //         if (result === undefined || result.length == 0) {
    const report = new reportModel({
        _id: mongoose.Types.ObjectId(),
        report_no: req.body.report_no,
        report_name: req.body.report_name,
        report_description: req.body.report_description,
        reporting_period: req.body.reporting_period,
        report_type: req.body.report_type,
        data_chart: req.body.data_chart,
       




    });
    report.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating report", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            // res.sendStatus(200)
        }
    })

    //         } else {
    //             res.status(200).json({ result: result,error:true, message: "report Already Exists" ,statusCode:200})

    //         }
    //     }
    // })

}
// Update 
exports.updatereport = async (req, res) => {
    const updateData = {
        report_no: req.body.report_no,
        report_name: req.body.report_name,
        report_description: req.body.report_description,
    }
    const options = {
        new: true
    }
    reportModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




