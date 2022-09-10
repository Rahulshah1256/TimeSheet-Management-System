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
      let task = req.body;
      query = "insert into task (name, projectId, startTime, endTime) values(?, ?, ?, ?)";
      connection.query(query, [task.name, task.projectId, task.startTime, task.endTime], (err, results) => {
        if (!err) {
          return res.status(200).json({ message: "Task added successfully" });
        } else {
          return res.status(500).json(err);
        }
      });
    }
  );

  router.get("/get", auth.authenticateToken, (req, res, next) => {
    var query = "select t.id, t.name, t.startTime, t.endTime, p.id as projectId, p.name as projectName from task as t INNER JOIN project as p where t.projectId = p.id";
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
      "select id, name from task where projectId=?";
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
    var query = "select id, name, startTime, endTime from task  where id=?";
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
      let task = req.body;
      var query =
        "update task set name=?, projectId=?, startTime=?, endTime=? where id=?";
      connection.query(
        query,
        [
          task.name,
          task.projectId,
          task.startTime,
          task.endTime,
          task.id,
        ],
        (err, results) => {
          if (!err) {
            if (results.affectedRows == 0) {
              return res
                .status(404)
                .json({ message: "Task id does not found" });
            }
            return res
              .status(200)
              .json({ message: "Task Updated Successfully" });
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
      var query = "delete from task where id=?";
      connection.query(query, [id], (err, results) => {
        if (!err) {
          if (results.affectedRows == 0) {
            return res.status(404).json({ message: "Task id does not found" });
          }
          return res
            .status(200)
            .json({ message: "Task Deleted Successfully" });
        } else {
          return res.status(500).json(err);
        }
      });
    }
  );
  
  module.exports = router;
  