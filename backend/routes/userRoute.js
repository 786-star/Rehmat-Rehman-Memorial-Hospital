const express = require('express');
const { registerUser, loginUser } = require('../controller/userController');
// const { verifyJWT } = require('../middlewares/verifyJWT')

const router = express.Router()

// register user manually 
router.post('/register', registerUser)
router.post('/login', loginUser)
// router.get("/dashboard", verifyJWT, (req, res) => {
//     res.json({ msg: "Welcome to Hospital Dashboard", userId: req.user.id });
// });

module.exports = router;