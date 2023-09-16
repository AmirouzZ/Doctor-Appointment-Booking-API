import Review from "../models/ReviewSchema.js"
import Doctor from "../models/DoctorSchema.js"

export const getAllReviews = async(req, res) => {
    try {
        const reviews = await Review.find({})
        if(!reviews.length){
            return res.status(404).json({
                success: false,
                message: "No reviews found"
            })
        }
        return res.status(200).json({
            success:true,
            message: "reviews found",
            data: reviews
        })
    } catch (error) {
        return res.status(200).json({
            success:false,
            message: "Internal server error",
            error: error.message
    })
}
}

export const createReview = async(req, res) => {
    if(!req.body.doctor){
        req.body.doctor = req.params.doctorId
    }
    if(!req.body.user){
        req.body.user = req.userId
    }
    try {
    let review = await Review.findOne({user:req.body.user, doctor: req.body.doctor})
    if(review){
         review.reviewText = req.body.reviewText
         review.rating = req.body.rating
         await review.save()
        return res.status(200).json({success: true, message:"Review submitted successfully", data: review})    
    } else{
        
    const review = new Review(req.body)
    
    await review.save()
    await Doctor.findByIdAndUpdate(req.body.doctor, {
        $push: {reviews: review._doc}
    })
    return res.status(200).json({success: true, message:"Review submitted successfully", data: review})   

    }  
    } catch (error) {
        return res.status(500).json({success: false, message:"Review not submitted ", error: error.message})            
    }
}
