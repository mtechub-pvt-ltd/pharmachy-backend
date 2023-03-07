const staffModel = require("../models/staffModel");
const mongoose = require("mongoose");

// Get All staff 
exports.getAllstaffs = (req, res) => {
    staffModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// // Get staff 
exports.getSpecificstaff = (req, res) => {

    const staffId = req.params.staffId;
    staffModel.find({ _id: staffId }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
// // Get staff by role
exports.getSpecificstaffByRoles = (req, res) => {

    const Roles = req.body.roles;
    staffModel.find({ roles: Roles }, function (err, foundResult) {
        try {
            res.status(200).json({ result: foundResult, error: false, message: "Get Data Successfully", statusCode: 200 })

        } catch (err) {
            res.status(200).json({ result: err, error: true, message: "Not getting Data", statusCode: 200 })
        }
    })
}
exports.getSpecificstaffByRolesStaff = async(req, res) => {
    const data = await staffModel.aggregate().sortByCount("roles");
    res.json(data)

}

// Delete 
exports.deletestaff = (req, res) => {
    const staffId = req.params.staffId;
    staffModel.findByIdAndDelete(staffId, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: true, message: error.message, statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Deleted Successfully", statusCode: 200 })
        }
    })
}
// Delete All
exports.deletestaffAll = (req, res) => {
    staffModel.deleteMany({}, (error, result) => {
        if (error) {
            res.send(error)
            res.status(200).json({ result: error, error: true, message: "Some Error ", statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "All Record Deleted Successful ", statusCode: 200 })

        }
    })
}
// Create 
exports.createstaff = async (req, res) => {
    // staffModel.find({ name: req.body.name }, (error, result) => {
    //     if (error) {
    //         res.status(200).json({ result: error,error:true, message: "Error in staff name " ,statusCode:200})

    //     } else {
    //         if (result === undefined || result.length == 0) {
    const staff = new staffModel({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        cnic: req.body.cnic,
        age: req.body.age,
        gender: req.body.gender,
        Dob: req.body.Dob,
        qualification: req.body.qualification,
        roles: req.body.roles,
        attendence_record: req.body.attendence_record,
        salaries: req.body.salaries,




    });
    staff.save((error, result) => {
        if (error) {
            res.status(200).json({ result: error, error: true, message: "Error Creating staff", statusCode: 200 })
        } else {
            res.status(200).json({ result: result, error: false, message: "Created Successfully", statusCode: 200 })
            // res.sendStatus(200)
        }
    })

    //         } else {
    //             res.status(200).json({ result: result,error:true, message: "staff Already Exists" ,statusCode:200})

    //         }
    //     }
    // })

}
// Update 
exports.updatestaff = async (req, res) => {
    const updateData = {
        name: req.body.name,
        cnic: req.body.cnic,
        age: req.body.age,
        gender: req.body.gender,
        Dob: req.body.Dob,
        qualification: req.body.qualification,
        roles: req.body.roles,
        attendence_record: req.body.attendence_record,
        salaries: req.body.salaries,
    }
    const options = {
        new: true
    }
    staffModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.status(200).json({ result: result, error: false, message: error.message, statusCode: 200 })

        } else {
            res.status(200).json({ result: result, error: false, message: "Updated Successfully", statusCode: 200 })

        }
    })
}




