import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required']
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            default: 'CreatingOrder'
        },
        completionDate: {
            type: Date,
            default: null,
        },
        peopleAndRoles: [
            {
                personId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Person',
                    required: true
                },
                role: {
                    type: [String],
                    required: true
                }
            }
        ],
        assetsAndDistribution: [
            {
                assetId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Asset',
                },
                distribution: [
                    {
                        personId: {
                            type: Schema.Types.ObjectId,
                            ref: 'Person',
                        },
                        receivingAmount: {
                            type: String,
                        }
                    }
                ]
            }
        ],

    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema)

export default Order;