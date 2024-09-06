import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'UserId is required']
        },
        reviewText: {
            type: String,
            required: [true, 'Review text is required']
        },
        userFirstName: {
            type: String,
            required: [true, 'Name is required']
        },
        rating: {
            type: Number,
            required: [true, 'Review rating is required']
        },
    },
    { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
