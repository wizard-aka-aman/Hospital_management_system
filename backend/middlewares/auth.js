import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken"

export const isAdminAuthenticated= catchAsyncErrors(async (req,res,next)=>{
    const token = req.cookies.adminToken;
    // console.log(token)
    if(!token){
        return next(new ErrorHandler("Admin not Authenticated" , 400));
    }
    const decoded = jwt.verify(token,"aljfbqwkhdasd");
    // console.log(decoded)
    // console.log("BEFORE"+req.user)
    req.user = await User.findById(decoded.id);
        if(req.user.role !== "Admin"){
               return next( new ErrorHandler(`${req.user.role} not autherized for this resourse` , 403)
            );
        }
        // console.log("AFTER"+req.user)
next();
})
export const isPatientAuthenticated= catchAsyncErrors(async (req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient not Authenticated" , 400));
    }
    const decoded = jwt.verify(token,"aljfbqwkhdasd");
    console.log(decoded)
    req.user = await User.findById(decoded.id);
        if(req.user.role !== "Patient"){
               return next( new ErrorHandler(`${req.user.role} not autherized for this resourse` , 403)
            );
        }
next();
})