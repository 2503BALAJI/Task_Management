const express = require("express"); 
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());

// ✅ Allow requests from frontend running on port 5173
app.use(cors());

// db connection establish 
require("./config/database").connect();

// import Route
const route = require("./routes/taskRoutes");

// mount tht route
app.use("/api/v1",route);

// stsrting the setver
const PORT = process.env.PORT
app.get("/", (req,res)=>{
    res.send("This is Home Page of Task Management Backend")
})
app.listen(PORT,(req,res)=>{
    console.log(`App is Running at Port  ${PORT}`)
})