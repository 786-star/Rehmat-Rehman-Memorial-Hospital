const PatientHistory = require("../model/patientHistoryModel");
const RegisterPatient = require("../model/patientModel");

exports.getHistoryByPatientId = async (req, res) => {
  try {
    const patientId = req.params.id;

    const patient = await RegisterPatient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    const history = await PatientHistory.find({ patient: patientId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      patient,
      history,
    });
  } catch (error) {
    console.error("Error fetching patient history:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
