import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName : {
        type : String,
        require : true,
        minLength : [3, "first name must contain atleast"]
    },
    lastName : {
        type : String,
        require : true,
        minLength : [3, "last name must contain atleast"]
    },
    email : {
        type : String,
        require : true,
        validate : [validator.isEmail , "Please provide a valid email"]
    },
    phone : {
        type : String,
        require : true,
        minLength : [10, "phone number must contain 10 exact numbers "],
        maxLength : [10, "phone number must contain 10 exact numbers "]
    }, 
    message : {
        type : String,
        require : true,
    },
    
})

export const Message = mongoose.model("Message" , messageSchema);