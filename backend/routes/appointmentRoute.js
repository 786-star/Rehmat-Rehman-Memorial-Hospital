const express = require("express");
const router = express.Router();
const { createAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment } = require("../controller/appointmentController");

// Create
router.post("/addappointment", createAppointment);

// Read
router.get("/getappointment", getAllAppointments);

router.get("/:id", getAppointmentById);

// Update
router.put("/:id", updateAppointment);

// Delete
router.delete("/:id", deleteAppointment);

module.exports = router;