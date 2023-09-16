import User from "../models/UserSchema.js"

export const updateUser = async(req, res) => {
    const id = req.params.id
   try {
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({success: false, message: "User Not found"})
    }
    const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true}).select("-password")    
    res.status(200).json({success: true, message: "Successfully updated", data: updatedUser})
   } catch (error) {
    res.status(500).json({success: false, message: "failed to update", error: error.message})

   }
}


export const deleteUser = async(req, res) => {
    const id = req.params.id
   try {
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({success: false, message: "User Not found"})
    }
    const deletedUser = await User.findByIdAndDelete(id).select("-password")   
    res.status(200).json({success: true, message: "Successfully deleted", data: deletedUser})
   } catch (error) {
    res.status(500).json({success: false, message: "failed to delete", error: error.message})

   }
}

export const getSingleUser = async(req, res) => {
    const id = req.params.id
   try {
    const user = await User.findById(id).select("-password")
    if(!user){
        return res.status(404).json({success: false, message: "User Not found"})
    }
    return res.status(200).json({success: true, message: "Successfully found", data: user})
   } catch (error) {
    res.status(500).json({success: false, message: "failed to find user", error: error.message})

   }
}

export const getAllUsers = async(req, res) => {
   try {
    const users = await User.find({}).select("-password")
    if(!users){
        return res.status(404).json({success: false, message: "No users found"})
    }
    return res.status(200).json({success: true, message: "users found", data: users})
   } catch (error) {
    res.status(500).json({success: false, message: "failed to found users", error: error.message})
   }
}