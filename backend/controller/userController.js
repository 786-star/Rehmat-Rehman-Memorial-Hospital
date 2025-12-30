const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User (you can use this once manually to create login user)
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, msg: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ msg: "Invalid username or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: "Invalid username or password" });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(201).json({
            success: true, token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
