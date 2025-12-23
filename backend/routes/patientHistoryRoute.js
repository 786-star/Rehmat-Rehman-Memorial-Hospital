const express = require("express");
const router = express.Router();
const {  getHistoryByPatientId } = require("../controller/patientHistoryController");

router.get("/getpatientshistory/:id", getHistoryByPatientId);

module.exports = router;