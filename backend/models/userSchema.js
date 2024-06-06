import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minLength: [3, "first name must contain atleast"]
    },
    lastName: {
        type: String,
        require: true,
        minLength: [3, "last name must contain atleast"]
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
    password: {
        type: String,
        require: true,
        minLength: [8, "Password must contain at Least 8 character"],
        select: false
    },
    role: {
        type: String,
        require: true,
        enum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment: {
        type: String,
        require :true

    },
    docAvatar: {
        public_id: String,
        url: String
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
return await bcrypt.compare(enteredPassword , this.password);
}

userSchema.methods.generateJsonWebToken = function(){
   
    return jwt.sign({id : this._id }, "aljfbqwkhdasd")
}
export const User = mongoose.model("User", userSchema);