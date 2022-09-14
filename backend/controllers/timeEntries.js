const connection = require("../connection");

exports.addTimeEntries = async (req, res, next) => {
    try{
        let timeEntries = req.body;
        let query =`insert into timeEntries (name, projectId, taskId, date, StartTime, EndTime, status) values('${timeEntries.name}', '${timeEntries.projectId}', '${timeEntries.taskId}', '${timeEntries.date}', '${timeEntries.StartTime}', '${timeEntries.EndTime}', 'true')`;
        connection.query(query, (err, results) => {
            if (!err) {
              return res.status(200).json({ message: "Time Entry Added Successfully" });
            } 
          }
        );
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
 };

 exports.getTimeEntries = async (req, res, next) => {
    try{
        let query = "select t.id, t.name, t.date, t.StartTime, t.EndTime, t.status, p.id as projectId, p.name as projectName, tk.id as taskId, tk.name as taskName from timeEntries as t INNER JOIN project as p ON t.projectId = p.id  JOIN task as tk ON t.taskId = tk.id ";
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

 exports.getByProject = async (req, res, next) => {
    try{
        const id = req.params.id;
        let query = "select id, name from timeEntries where projectId=? and status='true'";
        connection.query(query, [id], (err, results) => {
        if (!err) {
           return res.status(200).json(results);
         } 
       });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
 };

 exports.getById = async (req, res, next) => {
    try{
        const id = req.params.id;
        let query = `select id, name, date, StartTime, EndTime from timeEntries  where id='${id}'`;
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

 exports.updateTimeEntries = async (req, res, next) => {
    try{
        let timeEntries = req.body;
        let query = `update timeEntries set name='${timeEntries.name}', projectId='${timeEntries.projectId}', taskId='${timeEntries.taskId}', date='${timeEntries.date}', StartTime='${timeEntries.StartTime}', EndTime='${timeEntries.EndTime}' where id='${timeEntries.id}'`;
        connection.query(query, (err, results) => {
        if (!err) {
          if (results.affectedRows == 0) {
            return res.status(404).json({ message: "Time Entry id does not found" });
          }
          return res.status(200).json({ message: "time Entry Updated Successfully" });
          } 
        }
        );
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
 };

 exports.deleteTimeEntries = async (req, res, next) => {
    try{
        const id = req.params.id;
        let query = `delete from timeEntries where id='${id}'`;
        connection.query(query, (err, results) => {
          if (!err) {
            if (results.affectedRows == 0) {
              return res.status(404).json({ message: "Time Entry id does not found" });
            }
            return res
              .status(200)
              .json({ message: "Time Entry Deleted Successfully" });
          } 
        });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
 };