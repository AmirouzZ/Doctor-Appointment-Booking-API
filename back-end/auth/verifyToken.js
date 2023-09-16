import  jwt  from "jsonwebtoken"
import Doctor from "../models/DoctorSchema.js"
import User from "../models/UserSchema.js"

export const authenticate = async(req, res, next) => {
    const authToken = req.headers.authorization
    if(!authToken || !authToken.startsWith("Bearer ")){
        return res.status(401).json({
            success: false,
            message: "No token provided, access denied"
        })
    }

    try {
        const token = authToken.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = decoded.id
        req.userRole = decoded.role

        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({success: false, message: 'Token is expired'})
        }
        return res.status(401).json({success: false, message: 'Invalid Token'})

    }
}

export const allow = roles => async(req, res, next) => {
    const userId = req.userId
    const patient = await User.findById(userId)
    const doctor = await Doctor.findById(userId)
    let user = null
    if(patient){
        user = patient
    } else if(doctor){
        user = doctor
    }
    if(!roles.includes(user.role)){
        return res.status(401).json({
            success: false,
            message: "You are not authorized, access denied"
        })
    }
    next()
}