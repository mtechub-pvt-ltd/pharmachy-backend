const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:String,
    email: String,
    password: String,
    profile_Image:String,
    babyInfo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'babyInfo'
    }],
    isLogin:Boolean,
    subscriptionId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subscription_history'
    }],
    profile_Image:String,

}
);
module.exports = mongoose.model("user", userSchema);