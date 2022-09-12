const express = require("express");
const connection = require("../connection");
const router = express.Router();

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const auth = require("../middleware/authentication");
const checkRole = require("../middleware/checkRole");
const passwordEncrypt = require("../middleware/passwordEncrypt");

router.post("/signup", passwordEncrypt.encryptPassWord, (req, res) => {
  let employee = req.body;
  query = "select email, password, role, status from employee where email=?";
  connection.query(query, [employee.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        
        query =
          "insert into employee(name, contactNumber, email, password, status, role) values(?, ?, ?, ?, 'false', 'user')";
        connection.query(
          query,
          [employee.name, employee.contactNumber, employee.email, employee.password],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Successfully Registered" });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({ message: "Email Already Exist" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/login", (req, res) => {
  const employee = req.body;
  query = "select email, password, role, status from employee where email=?";
  connection.query(query, [employee.email], (err, results) => {
    if (!err) {
      if (results.length <= 0 || results[0].password != employee.password) {
        return res
          .status(401)
          .json({ message: "Incorrect username or password" });
      } else if (results[0].status === "false") {
        return res.status(401).json({ message: "Wait for Admin Approval" });
      } else if (results[0].password === employee.password) {
        const response = { email: results[0].email, role: results[0].role };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: "8h",
        });
        res.status(200).json({ token: accessToken });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong. Please try again" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/forgotPassword", (req, res) => {
  const employee = req.body;
  query = "select email, password from employee where email=?";
  connection.query(query, [employee.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res
          .status(200)
          .json({ message: "Password sent Successfully to your email" });
      } else {
        const mailOptions = {
          from: process.env.EMAIL,
          to: results[0].email,
          subject: "Password by Timesheet Management System",
          html:
            "<p><b>Your login details for Timesheet Management System</b><br><b>Email: </b>" +
            results[0].email +
            "<br><b>Password: </b>" +
            results[0].password +
            '<br><a href="http://localhost:4200/">Click here to Login</a></p>',
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        return res
          .status(200)
          .json({ message: "Password sent Successfully to your email" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/get", auth.authenticateToken, checkRole.checkRole, (req, res) => {
  var query =
    "Select id, name, email, contactNumber, status from employee where role='user'";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch(
  "/update",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res) => {
    let employee = req.body;
    var query = "update employee set status=? where id=?";
    connection.query(query, [employee.status, employee.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "User id doesnot exist" });
        }
        return res.status(200).json({ message: "User updated Successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

router.get("/checkToken", (req, res) => {
  return res.status(200).json({ message: "true" });
});

router.post("/changePassword", auth.authenticateToken, (req, res) => {
  const employee = req.body;
  const email = res.locals.email;
  var query = "select * from employee where email=? and password=?";
  connection.query(query, [email, employee.oldPassword], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: "Incorrect old password" });
      } else if (results[0].password == employee.oldPassword) {
        query = "update employee set password=? where email=?";
        connection.query(query, [employee.newPassword, email], (err, results) => {
          if (!err) {
            return res
              .status(200)
              .json({ message: "Password Updated Successfully" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "Something went wrong. Please try agaib later" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
