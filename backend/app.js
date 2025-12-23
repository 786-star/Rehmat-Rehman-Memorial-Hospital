const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectToDatabase = require('./database/db')
connectToDatabase()
const app = express();


// routes middleware 
const userRoute = require("./routes/userRoute")
const patientRoute = require("./routes/patientRoute")
const appointmentRoute = require("./routes/appointmentRoute")
const historyPatientRoute = require("./routes/patientHistoryRoute")
const tokenRoute = require("./routes/tokenRoute")



app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api", tokenRoute);
app.use("/api", userRoute);
app.use("/api", patientRoute)
app.use("/api", appointmentRoute)
app.use("/api", historyPatientRoute)


const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
    console.log(`Server is running at port no ${PORT}`)
})