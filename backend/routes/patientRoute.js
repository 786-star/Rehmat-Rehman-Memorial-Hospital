const express = require("express");
const { addPatient, getPatient, getPatientById, getPatientByMRID } = require("../controller/patientController");
const router = express.Router();

// router.post("/addpatients", addPatient);
// router.get("/getpatients", getPatient);
// router.get("/getpatients/:id", getPatientById);
// router.get("/getpatients/by-mrid/:mrid", getPatientByMRID);

router.post("/addpatients", addPatient);

// List + Search
// /patients
// /patients?mrid=07-2025
// /patients?cnic=12345-6789012-3
router.get("/getpatients", getPatient);

// Single patient detail
router.get("/getpatients/:id", getPatientById);

module.exports = router;