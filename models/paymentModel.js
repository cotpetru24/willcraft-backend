import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: [true, 'Order ID is required']
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required']
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            default: 'pending'
        },
        paymentDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        products: [
            {
                name: { type: String, required: true },
                price: { type: Number, required: true }
            }
        ],
        paymentMethod: {
            type: String,
            required: [true, 'Payment method is required'],
            enum: ['card', 'bank_transfer', 'paypal', 'stripe']
        }
    },
    { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
