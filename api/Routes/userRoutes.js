const router = require("express").Router();
const controller= require("../../Services/userServices")

router.get("/get-all" ,controller.getAllusers)
router.get("/get/:userId" ,controller.getSpecificuser)

// router.get("/get-admin-by-ID/:adminId" , controller.getSpecificadmin)
router.delete("/delete/:userId" , controller.deleteuser);
router.post("/create" , controller.createuser);
router.post("/otpSms" , controller.otpTwilio);

router.put("/update-user" , controller.updateuser);
router.put("/update-user-profile-Image" , controller.updateuserProfileImage);

router.put("/logout" , controller.logoutuser);
router.put("/login" , controller.loginuser);
router.get("/getByUserName/:username" , controller.getUserByUserName);

// router.post("/forget-password" , controller.forgetPassworduser);

module.exports = router;