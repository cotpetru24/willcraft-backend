import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = mongoose.Schema(
    {
        senderName: {
            type: String,
            required: [true, 'Sender name is required']
        },
        senderEmail: {
            type: String,
            required: [true, 'Sender email is required']
        },
        messageText: {
            type: String,
            required: [true, 'Message text is required']
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
