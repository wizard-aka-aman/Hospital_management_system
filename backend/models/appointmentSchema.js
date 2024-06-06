import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minLength: [3, "first name must contain atleast 3 "]
    },
    lastName: {
        type: String,
        require: true,
        minLength: [3, "last name must contain atleast 3"]
    },
    email: {
        type: String,
        require: true,
        validate: [validator.isEmail, "Provide A Valid Email!"],

    },
    phone: {
        type: String,
        require: true,
        minLength: [10, "phone number must contain 10 exact numbers "],
        maxLength: [10, "phone number must contain 10 exact numbers "]
    },
    nic: {
        type: String,
        require: true,
        minLength: [13, "NIC must contain exact 13 digits "],
        maxLength: [13, "NIC must contain exact 13 digits"]
    },
    dob: {
        type: String,
        require: [true, "DOB is Required"]
    },
    gender: {
        type: String,
        require: true,
        enum: ["male", "female"]
    },
    appointment_date:{
        type :String,
        require : true
    },
    department :{
        type :String,
        require : true
    },
    doctor:{
        firstName:{
            type :String,
            require : true
        },
        lastName:{
            type :String,
            require : true
        }
    },
    hasVisited :{
        type : Boolean,
        default : false
    },
    doctorId:{
        type : mongoose.Schema.ObjectId,
        reqired :true
    },
    patientId:{
        type : mongoose.Schema.ObjectId,
        reqired :true
    },
    address:{
        type :String,
        reqire :true
    },
    status :{
        type : String,
        enum :["Pending" , "Accepted" , "Rejected"],
        default : "Pending"
    }
});

export const Appointment = mongoose.model("Appointment" , appointmentSchema);
