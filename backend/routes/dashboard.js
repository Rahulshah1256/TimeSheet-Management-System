const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");
const dashboardDetailsController = require("../controllers/dashboard");

router.get("/details", auth.authenticateToken, dashboardDetailsController.dashboardDetails);

module.exports = router;
