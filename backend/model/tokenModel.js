const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    tokenNo: {
        type: Number,
        required: true
    },
    mrid: {
        type: String,
        required: true,
        unique: true
    },
    estimatedTime: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Token', tokenSchema);