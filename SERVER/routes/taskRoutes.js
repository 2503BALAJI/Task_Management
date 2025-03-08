
const express = require("express");
const router = express.Router();

// import Controller function 
const {createTask,getAllTask,updateTask,deleteTask} = require("../controller/task");

// create route
router.post("/createTask",createTask);
router.get("/getAllTask",getAllTask);
router.put("/updateTask/:id",updateTask); // id params madhe pass keli 
router.delete("/deleteTask/:id",deleteTask); 


// exports the routes
module.exports=router;
