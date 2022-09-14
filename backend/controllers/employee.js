const connection = require("../connection");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const authorize = require("../middleware/authorize");


 exports.signup = async (req,res) => { 
    try{
            let employee = req.body;
            let query = `select email, password, role, status from employee where email='${employee.email}'`;
            connection.query(query, (err, results) => {
              if (!err) {
                console.log(results.length);
                if (results.length <= 0) {
                  query = `insert into employee(name, contactNumber, email, password, status, role) values('${employee.name}', '${employee.contactNumber}', '${employee.email}', '${employee.password.content}', 'false', 'user')`;
                  connection.query(query, (err, results) => {
                      if (!err) {
                        return res.status(200).json({ message: "Registered Successfully" });
                      } else {
                        return res.status(500).json(err);
                      }
                    }
                  );
                } else {
                  return res.status(400).json({ message: "Email Already Exist" });
                }
              }
            });
    } catch(err) {
        console.log(err);
        return res.status(500).send(err.message);

    }
 };

 exports.login = async (req, res) => {
    try{
           
            
      
      const employee = req.body;
      let query = `select email, password, role, status from employee where email='${employee.email}'`;
      connection.query(query, (err, results) => {
        if (!err) {
          const decryptPassword = authorize.decryptPassWord(results[0].password);
          if (results.length <= 0 || decryptedPassword != employee.password) {
            return res.status(401).json({ message: "Incorrect username or password" });
          } else if (results[0].status === "false") {
            return res.status(401).json({ message: "Wait for Admin Approval" });
                } else if (decryptPassword === employee.password) {
                  const response = { email: results[0].email, role: results[0].role };
                  const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
                    expiresIn: "8h",
                  });
                  res.status(200).json({ token: accessToken });
                } else {
                  return res.status(400).json({ message: "Something went wrong. Please try again" });
                }
              } 
            });
    }catch(err){
        console.log(err);
        return res.status(500).send(err.message);
    }      
 };

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
        
exports.forgotPassword = async (req, res) => {
    try{
        const employee = req.body;
        let query = `select email, password from employee where email='${employee.email}'`;
            connection.query(query, (err, results) => {
          if (!err) {
            if (results.length <= 0) {
              return res.status(200).json({ message: "Password sent Successfully to your email" });
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
              return res.status(200).json({ message: "Password sent Successfully to your email" });
            }
          }
        });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
}

exports.get = async (req, res) => {
    try{
        let query = "Select id, name, email, contactNumber, status from employee where role='user'";
        connection.query(query, (err, results) => {
        if (!err) {
          return res.status(200).json(results);
        }
      });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};

exports.update = async  (req, res) => {
    try{
        let employee = req.body;
        let query = `update employee set status='${employee.status}' where id='${employee.id}'`;
        connection.query(query, (err, results) => {
          if (!err) {
            if (results.affectedRows == 0) {
              return res.status(404).json({ message: "User id does not exist" });
            }
            return res.status(200).json({ message: "User updated Successfully" });
          } 
        });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);

    }
};

exports.changePassword = async (req, res) => {
    try{
        const employee = req.body;
        const email = res.locals.email;
        let query = `select * from employee where email='${email}' and password='${employee.oldPassword}'`;
        connection.query(query, (err, results) => {
          if (!err) {
            if (results.length <= 0) {
              return res.status(400).json({ message: "Incorrect old password" });
            } else if (results[0].password == employee.oldPassword) {
              query = `update employee set password='${employee.newPassword}' where email='${email}'`;
              connection.query(query, (err, results) => {
                if (!err) {
                  return res.status(200).json({ message: "Password Updated Successfully" });
                } else {
                  return res.status(500).json(err);
                }
              });
            } else {
              return res.status(400).json({ message: "Something went wrong. Please try again later" });
            }
          }
        });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};
    