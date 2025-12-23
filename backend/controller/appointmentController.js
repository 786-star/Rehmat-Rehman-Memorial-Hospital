const RegisterPatient = require('../model/patientModel');
const Appointment = require('../model/appointmentModel');

exports.createAppointment = async (req, res) => {
  try {
    const { mrid, department, doctor, date, timeSlot, status } = req.body;

    if (!mrid) {
      return res.status(400).json({ message: "MRID is required" });
    }

    // Trim and case-insensitive search
    const patientMRID = mrid.trim();
    const patient = await RegisterPatient.findOne({
      mrid: { $regex: `^${patientMRID}$`, $options: "i" }
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient with this MRID not found" });
    }

    const appointment = new Appointment({
      patient: patient._id,
      department,
      doctor,
      date: new Date(date),
      timeSlot,
      status: status || 'pending'
    });

    const savedAppointment = await appointment.save();
    await savedAppointment.populate('patient');

    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error("Appointment creation error:", error);
    res.status(400).json({ message: "Failed to create appointment", error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch appointments", error: error.message });
  }
};


// Get a single appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name");
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointment", error });
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update appointment", error });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete appointment", error });
  }
};
