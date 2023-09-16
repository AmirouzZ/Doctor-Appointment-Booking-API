 import Doctor from "../models/DoctorSchema.js"

export const updateDoctor = async(req, res) => {
    const id = req.params.id
   try {
    const doctor = await Doctor.findById(id)
    if(!doctor){
        return res.status(404).json({success: false, message: "doctor Not found"})
    }
    const updateddoctor = await Doctor.findByIdAndUpdate(id, {$set: req.body}, {new: true}).select("-password")    
    res.status(200).json({success: true, message: "Successfully updated", data: updateddoctor})
   } catch (error) {
    res.status(500).json({success: false, message: "failed to update", error: error.message})

   }
}


export const deleteDoctor = async(req, res) => {
    const id = req.params.id
   try {
    const doctor = await Doctor.findById(id)
    if(!doctor){
        return res.status(404).json({success: false, message: "doctor Not found"})
    }
    const deleteddoctor = await Doctor.findByIdAndDelete(id).select("-password")   
    res.status(200).json({success: true, message: "Successfully deleted", data: deleteddoctor})
   } catch (error) {
    res.status(500).json({success: false, message: "failed to delete", error: error.message})

   }
}

export const getSingleDoctor = async(req, res) => {
    const id = req.params.id
   try {
    const doctor = await Doctor.findById(id).populate('reviews').select("-password")
    if(!doctor){
        return res.status(404).json({success: false, message: "doctor Not found"})
    }
    return res.status(200).json({success: true, message: "Successfully found", data: doctor})
   } catch (error) {
    res.status(500).json({success: false, message: "failed to find doctor", error: error.message})

   }
}

export const getAllDoctors = async(req, res) => {

   try {
    const {query} = req.query
    let doctors
    if(query){
        doctors = await Doctor.find(
            {isApproved: 'Approved', 
            $or:[
                {name: {$regex:query, $options: 'i'}},
                {specialization: {$regex:query, $options: 'i'}}
            ]})
                .select('-password')
    } else {
         doctors = await Doctor.find({isApproved: 'approved'}).select("-password")
    }
    if(!doctors.length){
        return res.status(404).json({success: false, message: "No doctors found"})
    }
    return res.status(200).json({success: true, message: "doctors found", data: doctors})
   } catch (error) {
    res.status(500).json({success: false, message: "failed to found doctors", error: error.message})
   }
}