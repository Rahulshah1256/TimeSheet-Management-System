const express = require("express");
const cors = require("cors");
require("dotenv").config();
const employeeRoute = require("./routes/employee");
const projectRoute = require("./routes/project");
const timeEntriesRoute = require("./routes/timeEntries");
const taskRoute = require("./routes/task");
const dashboardRoute = require("./routes/dashboard");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/employee", employeeRoute);
app.use("/project", projectRoute);
app.use("/timeEntries", timeEntriesRoute);
app.use("/task", taskRoute);
app.use("/dashboard", dashboardRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
