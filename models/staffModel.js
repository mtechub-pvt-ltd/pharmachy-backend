const mongoose = require("mongoose");
const staffSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    cnic:String,
    age:String,
    gender: {
        type: String,
        enum: ['male','female','other']
    },
    Dob:String,
    qualification:String,
    roles:{
        type: String,
        enum: ['manager','staff','delivery man','sales man']
    },
    attendence_record:String,
    salaries:String,

}
);
module.exports = mongoose.model("staff", staffSchema);