const userModel = require("../models/userModel");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
// const forgetPasswordModel = require("../models/forgetPasswordModel");
var nodemailer = require('nodemailer')
const phoneNo = process.env.phoneNumber;

const client = require('twilio')(accountSid, authToken);

// Get All user 
exports.getAllusers = (req, res) => {
    userModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 }).populate('babyInfo').populate('subscriptionId')
}
// // Get user 
exports.getSpecificuser = (req, res) => {

    const userId = req.params.userId;
    userModel.find({ _id: userId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }).populate('babyInfo').populate('subscriptionId')
}
// get by user Name 
exports.getUserByUserName = (req, res) => {
    const username = req.params.username;
    userModel.find({ "username": { $regex: username, $options: 'i' } }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// // Login 
exports.loginuser = (req, res) => {
    const findUser = {
        email: req.body.email
    }
    userModel.findOne(findUser, (error, result) => {
        if (error) {
            res.json(error)
        } else {
            if (result) {
                if (bcrypt.compareSync(req.body.password, result.password)) {
                    const updateData = {
                        isLogin:true
                    }
                    const options = {
                        new: true
                    }
                    userModel.findByIdAndUpdate(result._id, updateData, options, (error, result) => {
                        if (error) {
                            res.json(error.message)
                        } else {
                            res.json({data:result,message:"Login Successfully"})
                        }
                    })

                } else {
                    res.json({message:"Invalid Password"})
                }
            } else {
                res.json({message:"Email Not Found"})
            }
        }
    })
}
// Update 
exports.logoutuser = async (req, res) => {
    const updateData = {
        isLogin: false
    }
    const options = {
        new: true
    }
    userModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Logout Successfully" })
        }
    })
}
// Forget Password Otp 
// exports.forgetPassworduser = async (req, res) => {
//     let data = await userModel.findOne({
//         email: req.body.email
//     });
//     const responseType = {};
//     responseType.data = data
//     console.log(data)
//     if (data) {
//         let otpcode = Math.floor((Math.random() * 10000) + 1);
//         let otpData = new forgetPasswordModel({
//             _id: mongoose.Types.ObjectId(),
//             email: req.body.email,
//             code: otpcode,
//             expiresIn: new Date().getTime() + 300 * 1000
//         })
//         let otpResponse = await otpData.save();
//         responseType.statusText = 'Success'
//         mailer(req.body.email, otpcode)
//         console.log(otpcode)
//         responseType.message = 'Please check Your Email Id';
//         responseType.otp = otpcode;
//     } else {
//         responseType.statusText = 'error'
//         responseType.message = 'Email Id not Exist';
//     }
//     res.status(200).json(responseType)
// }
// OTP TWILIO 
const mailer = (email, otp) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'rimshanimo22@gmail.com',
            pass: 'oespmdfxhmbhrxgd'
        }
    });
    transporter.verify().then(console.log).catch(console.error);

    // send mail with defined transport object
    var mailOptions = {
        from: 'rimshanimo22@gmail.com',
        to: email,
        subject: `OTP code is ` + otp,
        text: `Email Verification :OTP code is ` + otp,

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            // console.log('Email sent ' + info.response)
        }
    });
}
// Delete 
exports.deleteuser = (req, res) => {
    const userId = req.params.userId;
    userModel.findByIdAndDelete(userId, (error, result) => {
        if (error) {
            res.send({status:false, message: error.message })
        } else {
            res.json({status:true, message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createuser = async (req, res) => {
    userModel.find({ email: req.body.email }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const hashedPassword = bcrypt.hashSync(req.body.password, 12)

                const user = new userModel({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hashedPassword,
                    profile_Image:req.body.profile_Image,
                    username:req.body.username,
                    babyInfo: [],
                    subscriptionId:[]

                });
                user.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully" })
                    }
                })

            } else {
                res.json({ data: result, message: "Email Already Exists" })

            }
        }
    })

}
exports.otpTwilio = async (req, res) => {
    // if(req.body.toContact==="+96812345678" ||req.body.toContact==="+96823456781"||req.body.toContact==="+96834567812"||req.body.toContact==="+96845678123"){
    //     res.json({
    //         // data: message.sid,
    //         otp:"0000",
    //         message: "Message Send successfully"
    //     })
    // }else{
    let otpGenerator = Math.floor((Math.random() * 10000) + 1);
    const toContact = req.body.toContact
    client.messages
        .create({ body: `Verirification Otp :${otpGenerator}`, from: phoneNo, to: toContact })
        .then(message =>
            res.json({
                data: message.sid,
                otp: otpGenerator,
                message: "Message Send successfully"
            })
        )
    // }
}
// Update 
exports.updateuser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12)

    const updateData = {
        email:req.body.email,
        password:hashedPassword
    }
    const options = {
        new: true
    }
    userModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json({status:false,message:error.message})
        } else {
            res.send({ data: result,status:true, message: "Updated Password Successfully" })
        }
    })
}
// update-credentials
exports.updateuserProfileImage = async (req, res) => {
    const updateData = {
        username:req.body.username,
        profile_Image:req.body.profile_Image,
    }
    const options = {
        new: true
    }
    userModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result,status:true, message: "Updated Password Successfully" })
        }
    })
}



