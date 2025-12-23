const mongoose = require("mongoose");

const patientHistorySchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "RegisterPatient", required: true },
  visitDate: { type: Date, default: Date.now },
  temperature: { type: String },
  bloodPressure: { type: String },
  pulseRate: { type: String },
  spo2: { type: String },
  allergy: { type: String },
  otherDisease: { type: String },
}, { timestamps: true });


module.exports = mongoose.model("PatientHistory", patientHistorySchema);