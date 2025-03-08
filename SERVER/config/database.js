const { configDotenv } = require("dotenv");
const mongoose = require("mongoose");
require("dotenv").config();


exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB connected succesfully"))
    .catch((error)=>{
        console.log(error);
        console.log("Error in Database Connection");
        process.exit(1);
    })
}