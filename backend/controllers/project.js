const connection = require("../connection");

exports.addProject = async  (req, res, next) => {
    try{
        let project = req.body;
        let query = `insert into project(name) values('${project.name}')`;
        connection.query(query, (err, results) => {
          if (!err) {
            return res.status(200).json({ message: "Project added successfully" });
          } 
        });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
 };

 exports.getProjects = async  (req, res, next) => {
    try{
        let query = `select * from project order by name`;
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

 exports.updateProject = async  (req, res, next) => {
    try{
        let project = req.body;
        let query = `update project set name='${project.name}' where id='${project.id}'`;
        connection.query(query, [project.name, project.id], (err, results) => {
          if (!err) {
            if (results.affectedRows == 0) {
              return res.status(404).json({ message: "Project id does not found" });
            }
            return res.status(200).json({ message: "Project Updated Successfully" });
          }
        });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
 };

 exports.deleteProject = async (req, res, next) => {
    try{
        const id = req.params.id;
        let query = `delete from project where id='${id}'`;
        connection.query(query, (err, results) => {
          if (!err) {
            if (results.affectedRows == 0) {
              return res.status(404).json({ message: "Project id does not found" });
            }
            return res.status(200).json({ message: "Project Deleted Successfully" });
          } 
        });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
 };
   