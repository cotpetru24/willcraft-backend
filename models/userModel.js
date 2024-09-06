import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        status: {
            type: String,
            required: [true, 'Status is required'],
            default: 'active'
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
            default: 'user'
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
