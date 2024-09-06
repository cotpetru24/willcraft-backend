import asyncHandler from 'express-async-handler';
import Payment from '../models/paymentModel.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';


dotenv.config();
const stripe = new Stripe(process.env.STRIPE_API_SECRET);


export const createPayment = asyncHandler(async (req, res) => {
    const { orderId, amount, status, paymentDate, products, paymentMethod } = req.body;

    if (!orderId || !amount || !products || !paymentMethod) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const payment = await Payment.create({
        orderId,
        userId: req.user._id,
        amount,
        status: status || 'pending',
        paymentDate: paymentDate || Date.now(),
        products,
        paymentMethod
    });

    res.status(200).json(payment);
});


export const getPayment = asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id)

    if (!payment) {
        res.status(404);
        throw new Error('Payment not found');
    }

    res.status(200).json(payment);
});


export const paymentIntent = asyncHandler(async (req, res) => {
    const { products } = req.body;

    try {
        // Calculate the total amount payable
        const totalAmount = products.reduce((acc, product) => acc + Number(product.price), 0) * 100;

        // Create the payment intent with the calculated total amount
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'gbp',
            description: 'Order payment',
            automatic_payment_methods: { enabled: true },
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: 'Failed to create payment intent' });
    }
});
