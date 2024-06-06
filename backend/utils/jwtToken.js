export const generateToken = (user,message,statusCode,res)=>{
const token = user.generateJsonWebToken();
const cookieName  = user.role ==="Admin" ? "adminToken" : "patientToken";
res.status(statusCode).cookie(cookieName , token).json({
    success : true,
    message,
    user,
    token
});
}