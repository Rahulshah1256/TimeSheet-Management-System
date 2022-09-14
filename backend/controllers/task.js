const connection = require("../connection");

exports.addTask = async (req, res, next) => {
    try{
        let task = req.body;
        let query = `insert into task (name, projectId, startTime, endTime) values('${task.name}', '${task.projectId}', '${task.startTime}', '${task.endTime}')`;
        connection.query(query, (err, results) => {
          if (!err) {
            return res.status(200).json({ message: "Task added successfully" });
          } 
        });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
 };

 exports.getTask = async (req, res, next) => {
    try{
        let query = `select t.id, t.name, t.startTime, t.endTime, p.id as projectId, p.name as projectName from task as t INNER JOIN project as p ON t.projectId = p.id`;
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
        let query =`select id, name from task where projectId='${id}'`;
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

 exports.getById = async (req, res, next) => {
    try{
        const id = req.params.id;
        let query = `select id, name, startTime, endTime from task  where id='${id}'`;
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

 exports.updateTask = async (req, res, next) => {
    try{
        let task = req.body;
        let query =`update task set name='${task.name}', projectId='${task.projectId}', startTime='${task.startTime}', endTime='${task.endTime}' where id='${task.id}'`;
        connection.query(query, (err, results) => {
            if (!err) {
              if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Task id does not found" });
              }
              return res.status(200).json({ message: "Task Updated Successfully" });
            } 
          }
        );
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
 };

 exports.deleteTask = async (req, res, next) => {
    try{
        const id = req.params.id;
        let query = `delete from task where id='${id}'`;
        connection.query(query, (err, results) => {
        if (!err) {
          if (results.affectedRows == 0) {
            return res.status(404).json({ message: "Task id does not found" });
          }
          return res.status(200).json({ message: "Task Deleted Successfully" });
        } 
      });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
 };


   