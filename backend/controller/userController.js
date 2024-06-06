import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password, gender, dob, nic, role } = req.body;

    if (

        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !gender ||
        !dob ||
        !nic ||
        !role
    ) {
        return next(new ErrorHandler("please fill full form", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User Already Register", 400));
    }
    user = await User.create({ firstName, lastName, email, password, gender, dob, nic, role });
    generateToken(user, "user Register", 200, res);
})

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("please provide all details", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("password and confirmPassword do not match", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User with this role is not found", 400));
    }
    generateToken(user, "User logged in Successfully", 200, res);

})

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, password, gender, dob, nic } = req.body;

    if (

        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !gender ||
        !dob ||
        !nic
    ) {
        return next(new ErrorHandler("please fill full form", 400));
    }
    const isRegistered = await User.findOne({ email });

    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already Exist`, 400));
    }

    const admin = await User.create({ firstName, lastName, email, password, gender, dob, nic, role: "Admin" });
    res.status(200).json({
        success: true,
        message: " new Admin Registered"
    })
})

export const getAllDoctor = catchAsyncErrors(async (req, res, next) => {
    const doctor = await User.find({ role: "Doctor" });

    res.status(200).json({
        success: true,
        doctor
    })
})

export const getUserDetails = catchAsyncErrors((req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    })
})

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {

    res.status(200).cookie("adminToken", "",
        {
            httpOnly: true,
            expires: new Date(Date.now())
        }
    ).json({
        success: true,
        message: ' Admin Logged Out Successfully',
    })
})
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {

    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: ' Patient Logged Out Successfully',
    })
})

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor avtar Required", 400))
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/jpg","image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File formate not supported!", 400))
    }
    const { firstName, lastName, email, password, gender, dob, nic, doctorDepartment } = req.body;
    if (!firstName || !lastName || !email || !password || !gender || !dob || !nic || !doctorDepartment) {
        return next(new ErrorHandler("Please provied full details", 400))
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role}already register with this email`, 400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("cloudinary error : " ,cloudinaryResponse.error || "Unknown cloudinaryResponse error");
    }
    const doctor = await User.create({
        firstName, lastName, email, password, gender, dob, nic,docAvatar:{
            public_id : cloudinaryResponse.public_id,
            url : cloudinaryResponse.secure_url
        } , role :"Doctor",
        doctorDepartment 
    })
    res.status(200).json({
        success : true,
        message : "New Doctor Registered",
        doctor
    })
})
