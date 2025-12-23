const express = require("express");
const { generateToken,  getMRID } = require("../controller/tokenController");
const router = express.Router();

router.post('/token', generateToken);
router.get('/latestmrid', getMRID);

module.exports = router;