const Task = require("../model/Task");

// create a task 
exports.createTask= async (req,res)=>{
    try {
                // fetch the contetn 
        const{title,description}=req.body;

        // validation;
        if(!title || !description){
            res.status(400).json({
                success:false,
                message:"All field are Required"
            })
        };

        // create entry in db 
        const response = await Task.create({
            title,
            description
        });

        console.log("create t[ask entry -->",response);
        res.status(200).json({
            success:true,
            message:"Task is Created succesfully"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Issue in Fetching all task "
        })
    }
};

// Fetch all task 
exports.getAllTask = async (req,res)=>{
    try {
        const response = await Task.find({});
        console.log("All task is Fetched -->", response);
        res.status(200).json({
            success:true,
            message:"all task is fetched successfully",
           task:response
        })
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Issue in Fetching all task "
        })
    }
   
};

// Update the Task 
exports.updateTask = async (req, res) => {
    try {
        // Fetch the task ID from URL params
        const id = req.params.id;
        const { title, description, status } = req.body; // Now including `status`
        
        console.log("Getting ID from params -->", id);

        // If ID is not present
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required --> ID is not present in Params",
            });
        }

        // Check if task exists in the database
        const existing_task = await Task.findById(id);
        if (!existing_task) {
            return res.status(400).json({
                success: false,
                message: "Given ID is not present in the database",
            });
        }

        // Update fields if provided in the request body
        existing_task.title = title || existing_task.title;
        existing_task.description = description || existing_task.description;
        existing_task.status = status || existing_task.status; // ✅ Now handling `status`

        // Save the updated task in the database
        const updatedTask = await existing_task.save();

        // Send response
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask, // Sending updated task in response
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in updating the task",
        });
    }
};


// delete the task 
exports.deleteTask = async(req,res)=>{
    try {
        // get id from params 
        const {id} = req.params;
        //console.log("id get destructured ",id);

        if(!id){
            res.status(400).json({
             success:false,
             message:"Id is not present in Url"
            })

        };

        // check id is preset in db or not 
        const existing = await Task.findById(id);
        if(!existing){
            res.status(400).json({
                success:false,
                message:"Task is not found in DB , cannot delete this task  "
            })
        };

        // deltet the task 
        const response = await Task.findByIdAndDelete(id);

        console.log("deleted task  -->", response);
        res.status(200).json({
            success:true,
            message:"Task is deleted Successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Error in deletions Task "
        })
    }
};

