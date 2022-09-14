const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");
const checkRole = require("../middleware/checkRole");
const projectController = require("../controllers/project");

router.post("/add", auth.authenticateToken, checkRole.checkRole, projectController.addProject);

router.get("/get", auth.authenticateToken, projectController.getProjects);

router.patch("/update", auth.authenticateToken, checkRole.checkRole, projectController.updateProject);

router.delete("/delete/:id", auth.authenticateToken, checkRole.checkRole, projectController.deleteProject);

module.exports = router;
