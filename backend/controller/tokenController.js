const Token = require("../model/tokenModel");

exports.generateToken = async (req, res) => {
  try {
    const { patientName } = req.body;

    if (!patientName) {
      return res.status(400).json({ message: "Patient Name is required" });
    }

    const year = new Date().getFullYear();
    const lastToken = await Token.findOne({
      mrid: new RegExp(`-${year}$`)
    }).sort({ createdAt: -1 });

    let mridNumber = lastToken ? parseInt(lastToken.mrid.split("-")[0]) : 0;
    mridNumber += 1;
    const newMRID = `${String(mridNumber).padStart(2, "0")}-${year}`;

    const lastOverallToken = await Token.findOne().sort({ tokenNo: -1 });
    const newTokenNo = lastOverallToken ? lastOverallToken.tokenNo + 1 : 1;

    const newToken = new Token({
      patientName,
      tokenNo: newTokenNo,
      mrid: newMRID,
      estimatedTime: "20-30 Minutes"
    });

    await newToken.save();


    res.status(201).json({
      success: true,
      data: {
        tokenNo: newToken.tokenNo,
        mrid: newToken.mrid,
        patientName: newToken.patientName,
        estimatedTime: newToken.estimatedTime,
        createdAt: newToken.createdAt
      }
    });

  } catch (error) {
    console.error("Token Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getMRID = async (req, res) => {
  try {
    const getMrid = await Token.findOne().sort({ createdAt: -1 }).select('mrid');
    if (!getMrid) {
      return res.status(404).json({
        success: false,
        message: "No MRID found",
      });
    }
    res.status(200).json({
      success: true,
      data: getMrid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};