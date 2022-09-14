const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");
const checkRole = require("../middleware/checkRole");
const taskController = require("../controllers/task");

router.post("/add", auth.authenticateToken, checkRole.checkRole, taskController.addTask);

router.get("/get", auth.authenticateToken, taskController.getTask);

router.get("/getByProject/:id", auth.authenticateToken, taskController.getByProject);

router.get("/getById/:id", auth.authenticateToken, taskController.getById);
  
router.patch("/update", auth.authenticateToken, checkRole.checkRole, taskController.updateTask);

router.delete("/delete/:id", auth.authenticateToken, checkRole.checkRole, taskController.deleteTask);
 
module.exports = router;
  