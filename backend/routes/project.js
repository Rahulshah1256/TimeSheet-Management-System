const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../middleware/authentication");
var checkRole = require("../middleware/checkRole");

router.post(
  "/add",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    let project = req.body;
    query = "insert into project(name) values(?)";
    connection.query(query, [project.name], (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Project added successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

router.get("/get", auth.authenticateToken, (req, res, next) => {
  var query = "select * from project order by name";
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
  (req, res, next) => {
    let project = req.body;
    var query = "update project set name=? where id=?";
    connection.query(query, [project.name, project.id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res
            .status(404)
            .json({ message: "Project id does not found" });
        }
        return res
          .status(200)
          .json({ message: "Project Updated Successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

module.exports = router;
