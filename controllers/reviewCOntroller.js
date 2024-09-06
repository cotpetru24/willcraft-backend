import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
import User from '../models/userModel.js';


export const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({}).sort({ createdAt: -1 });

    if (reviews) {
        res.status(200).json(reviews);
    } else {
        res.status(400);
        throw new Error('Error getting reviews');
    }
});


export const getLast3Reviews = asyncHandler(async (req, res) => {
    const allReviews = await Review.find({}).sort({ createdAt: -1 });

    if (allReviews) {
        // Get the latest 3 reviews
        const last3Reviews = allReviews.slice(0, 3);

        // Calculate the average rating
        const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (totalRating / allReviews.length).toFixed(1);

        // Return the latest 3 reviews, average rating and total number of reviews
        res.status(200).json({
            latestReviews: last3Reviews,
            averageRating: averageRating,
            totalReviews: allReviews.length
        });
    } else {
        res.status(400);
        throw new Error('Error getting reviews');
    }
});


export const createReview = asyncHandler(async (req, res) => {
    if (!req.body.reviewText) {
        res.status(400);
        throw new Error('Please enter a review');
    }

    const review = await Review.create({
        userId: req.body.userId,
        userFirstName: req.body.userFirstName,
        reviewText: req.body.reviewText,
        rating: req.body.rating
    });
    res.status(200).json(review);
});


export const updateReview = asyncHandler(async (req, res) => {

    const review = await Review.findById(req.params.id);
    if (!review) {
        res.status(400);
        throw new Error('Review not found.');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('No such user found');
    }

    if (review.userId.toString() !== user.id) {
        res.status(401);
        throw new Error('User is not authorised to update');
    }

    const updatedReview = await Review.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
    );
    res.status(200).json(updatedReview);
});


export const deleteReview = asyncHandler(async (req, res) => {

    const review = await Review.findById(req.params.id);
    if (!review) {
        res.status(400);
        throw new Error('Review not found.');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('No such user found');
    }

    if (review.userId.toString() !== user.id) {
        res.status(401);
        throw new Error('User is not authorised to delete');
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
});
