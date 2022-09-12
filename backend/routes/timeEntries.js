const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../middleware/authentication");
var checkRole = require("../middleware/checkRole");

router.post("/add", auth.authenticateToken, checkRole.checkRole, (req, res) => {
  let timeEntries = req.body;
  var query =
    "insert into timeEntries (name, projectId, taskId, date, StartTime, EndTime, status) values(?, ?, ?, ?, ?, ?, 'true')";
  connection.query(
    query,
    [timeEntries.name, timeEntries.projectId, timeEntries.taskId, timeEntries.date, timeEntries.StartTime, timeEntries.EndTime],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Time Entry Added Successfully" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.get("/get", auth.authenticateToken, (req, res) => {
  var query =
    "select t.id, t.name, t.date, t.StartTime, t.EndTime, t.status, p.id as projectId, p.name as projectName, tk.id as taskId, tk.name as taskName from timeEntries as t INNER JOIN project as p ON t.projectId = p.id  JOIN task as tk ON t.taskId = tk.id ";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getByProject/:id", auth.authenticateToken, (req, res, next) => {
  const id = req.params.id;
  var query =
    "select id, name from timeEntries where projectId=? and status='true'";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getById/:id", auth.authenticateToken, (req, res, next) => {
  const id = req.params.id;
  var query = "select id, name, date, StartTime, EndTime from timeEntries  where id=?";
  connection.query(query, [id], (err, results) => {
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
    let timeEntries = req.body;
    var query =
      "update timeEntries set name=?, projectId=?, taskId=?, date=?, StartTime=?, EndTime=? where id=?";
    connection.query(
      query,
      [
        timeEntries.name,
        timeEntries.projectId,
        timeEntries.taskId,
        timeEntries.date,
        timeEntries.StartTime,
        timeEntries.EndTime,
        timeEntries.id,
      ],
      (err, results) => {
        if (!err) {
          if (results.affectedRows == 0) {
            return res
              .status(404)
              .json({ message: "Time Entry id does not found" });
          }
          return res
            .status(200)
            .json({ message: "time Entry Updated Successfully" });
        } else {
          return res.status(500).json(err);
        }
      }
    );
  }
);

router.delete(
  "/delete/:id",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res, next) => {
    const id = req.params.id;
    var query = "delete from timeEntries where id=?";
    connection.query(query, [id], (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Time Entry id does not found" });
        }
        return res
          .status(200)
          .json({ message: "Time Entry Deleted Successfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);

module.exports = router;
