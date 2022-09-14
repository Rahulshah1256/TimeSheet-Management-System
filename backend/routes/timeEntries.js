const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");
const timeEntriesController = require("../controllers/timeEntries");

router.post("/add", auth.authenticateToken,  timeEntriesController.addTimeEntries);

router.get("/get", auth.authenticateToken, timeEntriesController.getTimeEntries);

router.get("/getByProject/:id", auth.authenticateToken, timeEntriesController.getByProject);

router.get("/getById/:id", auth.authenticateToken, timeEntriesController.getById);

router.patch("/update", auth.authenticateToken, timeEntriesController.updateTimeEntries);
 
router.delete("/delete/:id", auth.authenticateToken, timeEntriesController.deleteTimeEntries);
  
module.exports = router;
