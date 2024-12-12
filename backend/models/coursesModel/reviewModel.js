import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  reviewText: { type: String },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
