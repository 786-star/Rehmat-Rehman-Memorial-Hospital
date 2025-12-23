const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
    visitDate: { type: Date, default: Date.now },
    temperature: { type: String },
    bloodPressure: { type: String },
    pulseRate: { type: String },
    spo2: { type: String },
    allergy: { type: String },
    otherDisease: { type: String },
});

const registerPatientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
    },
    age: {
        type: String,
    },
    CNIC: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{5}-\d{7}-\d{1}$/, "Please enter a valid CNIC in 12345-1234567-1 format"],
    },
    phone: {
        type: String,
        required: true,
        match: [/^03[0-9]{9}$/, "Please enter a valid Pakistani mobile number"],
    },
    mrid: {
        type: String,  // ✅ Changed from ObjectId to String
        unique: true,
        required: true,
        trim: true
    },
    maritalStatus: { type: String },
    patientType: { type: String },
    operation: { type: String },
    admitDate: { type: String },
    operationDate: { type: String },
    dischargeDate: { type: String },
    temperature: { type: String },
    bloodPressure: { type: String },
    spo2: { type: String },
    pulseRate: { type: String },
    allergy: { type: String },
    otherDisease: { type: String },
    diseases: {
        dm: { type: Boolean, default: false },
        htn: { type: Boolean, default: false },
        ihd: { type: Boolean, default: false },
        asthma: { type: Boolean, default: false },
    },

    history: [visitSchema],
}, { timestamps: true });

module.exports = mongoose.model("RegisterPatient", registerPatientSchema);
