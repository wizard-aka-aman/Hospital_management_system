import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage =catchAsyncErrors( async(req,res,next)=>{
    const {firstName , email,phone,lastName , message} = req.body;

    if(!firstName || !email ||!phone||!lastName ||!message){
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    await Message.create({firstName , email,phone,lastName , message});

    res.status(200).json({
        success : true,
        message : "Message send Successfully"
    })
})

export const getAllMessages = catchAsyncErrors(async(req,res,next)=>{
    const messages = await Message.find();
    res.status(200).json({
        success:true,
        messages
    })
})