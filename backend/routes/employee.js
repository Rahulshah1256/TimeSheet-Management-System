const express = require("express");
const router = express.Router();

require("dotenv").config();
const auth = require("../middleware/authentication");
const checkRole = require("../middleware/checkRole");
const authorize = require("../middleware/authorize");

const employeeController = require('../controllers/employee');

router.post("/signup", authorize.encryptPassWord, employeeController.signup);

router.post("/login", employeeController.login);

router.post("/forgotPassword", employeeController.forgotPassword);
 
router.get("/get", auth.authenticateToken, checkRole.checkRole, employeeController.get);

router.patch("/update",auth.authenticateToken,checkRole.checkRole, employeeController.update);

router.get("/checkToken", (req, res) => {
  return res.status(200).json({ message: "true" });
});

router.post("/changePassword", auth.authenticateToken, employeeController.changePassword);

module.exports = router;
