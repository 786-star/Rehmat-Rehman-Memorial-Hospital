const RegisterPatient = require("../model/patientModel");
const PatientHistory = require("../model/patientHistoryModel");
const Token = require("../model/tokenModel");

// POST /api/patients
exports.addPatient = async (req, res) => {
  try {
    const { mrid, CNIC, temperature, bloodPressure, pulseRate, spo2, allergy, otherDisease } = req.body;

    const token = await Token.findOne({ mrid });

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid MRID - Token not found"
      });
    }


    const existingPatient = await RegisterPatient.findOne({ CNIC });

    if (existingPatient) {
      const newVisit = new PatientHistory({
        patient: existingPatient._id,
        temperature,
        bloodPressure,
        pulseRate,
        spo2,
        allergy,
        otherDisease
      });

      await newVisit.save();

      return res.status(200).json({
        success: true,
        message: "Existing patient found — new visit added to history.",
        data: newVisit,
      });
    }

    // Check if MRID is already used by another patient
    const mridUsed = await RegisterPatient.findOne({ mrid });
    if (mridUsed) {
      return res.status(400).json({
        success: false,
        message: "MRID already assigned to another patient"
      });
    }


    // const lastPatient = await RegisterPatient.findOne().sort({ _id: -1 });
    // let newMRID = "MRID-01";

    // if (lastPatient && lastPatient.mrid) {
    //   const lastNumber = lastPatient.mrid.split("-")[1];
    //   const nextNumber = String(Number(lastNumber) + 1).padStart(2, "0");
    //   newMRID = `MRID-${nextNumber}`;
    // }

    const newPatient = new RegisterPatient({
      ...req.body,
      mrid: mrid
    });

    const savedPatient = await newPatient.save();

    const initialHistory = new PatientHistory({
      patient: savedPatient._id,
      temperature,
      bloodPressure,
      pulseRate,
      spo2,
      allergy,
      otherDisease,
    });

    await initialHistory.save();

    res.status(201).json({
      success: true,
      message: "New patient registered successfully",
      data: {
        patient: savedPatient,
        history: initialHistory,
        token: token
      }
    });
  } catch (error) {
    console.error("Error registering patient:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// get Patients 
exports.getPatient = async (req, res) => {
  try {
    const { mrid, cnic } = req.query;
    console.log("req.query:", req.query);
    // Search by MRID or cnic
    if (mrid || cnic) {
      const query = mrid ? { mrid } : { CNIC: cnic };
      const patient = await RegisterPatient.findOne(query);
      console.log("patient found:", patient);

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: "Patient not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: patient,
      });
    }


    const patients = await RegisterPatient.find().sort({ createdAt: -1 });

    if (!patients || patients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No patients found",
      });
    }

    res.status(200).json({
      success: true,
      data: patients,
    });

  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// get Patient By Id
exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await RegisterPatient.findById(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};