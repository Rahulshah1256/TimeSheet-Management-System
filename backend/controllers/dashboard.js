const connection = require("../connection");

exports.dashboardDetails = async  (req, res, next) => {
    try{
        let projectCount;
        let timeSheetCount;
        let taskCount;
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
      
        var query = "select count(id) as taskCount from task";
        connection.query(query, (err, results) => {
          if (!err) {
            taskCount = results[0].taskCount;
            let data = {
              project: projectCount,
              timeEntries: timeSheetCount,
              task: taskCount
            };
          return res.status(200).json(data);
          } 
        });
    }catch(err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
 };