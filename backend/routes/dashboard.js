const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../middleware/authentication");

router.get("/details", auth.authenticateToken, (req, res, next) => {
  var projectCount;
  var timeSheetCount;
  var query = "Select count(id) as projectCount from project";
  connection.query(query, (err, results) => {
    if (!err) {
      projectCount = results[0].projectCount;
    } else {
      return res.status(500).json(err);
    }
  });

  var query = "select count(id) as timeSheetCount from timeEntries";
  connection.query(query, (err, results) => {
    if (!err) {
      timeSheetCount = results[0].timeSheetCount;
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
