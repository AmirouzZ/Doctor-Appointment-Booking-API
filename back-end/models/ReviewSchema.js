import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function(next){
  this.populate({
    path: 'user',
    select: 'name photo',
  })
  next()
})

reviewSchema.statics.calcAverageRating = async function(doctorId){
  const stats = await this.aggregate([
    {
      $match:{doctor: doctorId}
    },
    {
      $group:{
        _id: '$doctor',
        numOfRatings: {$sum:1},
        avgOfRatings: {$avg: '$rating'}
      }
    }

console.log(stats)  
await Doctor.findByIdAndUpdate(doctorId, {
      $set:{
        totalRating: stats[0].numOfRatings,
        averageRating: stats[0].avgOfRatings
      }
    })
}

reviewSchema.post('save', function(){
  this.constructor.calcAverageRating(this.doctor)
})



export default mongoose.model("Review", reviewSchema);
