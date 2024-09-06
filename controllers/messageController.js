import Message from '../models/messageModel.js';
import asyncHandler from 'express-async-handler';


export const createMessage = asyncHandler(async (req, res) => {
    console.log('create message controller called');

    const { senderName, senderEmail, messageText, userId } = req.body;

    if (!senderName || !senderEmail || !messageText) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const messageData = { senderName, senderEmail, messageText };
    if (userId) {
        messageData.userId = userId;
    }
    const message = await Message.create(messageData);

    if (message) {
        res.status(201).json(message);
    } else {
        res.status(400);
        throw new Error('Invalid message data');
    }
});


export const getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({});

    if (messages) {
        res.status(200).json(messages);
    } else {
        res.status(400);
        throw new Error('Error retrieving messages');
    }
});


export const deleteMessage = asyncHandler(async (req, res) => {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
        res.status(400);
        throw new Error('Message not found');
    }

    res.status(200).json(message._id);
});
