import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorMiddleware.js';
import connectDb from './connect/connect.js';
import { peopleRoutes } from './routes/peopleRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import { orderRoutes } from './routes/orderRoutes.js';
import { reviewRoutes } from './routes/reviewRoutes.js';
import { messageRoutes } from './routes/messageRoutes.js';
import { assetRoutes } from './routes/assetRoutes.js';
import { paymentRoutes } from './routes/paymentRoutes.js';
import Stripe from 'stripe';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 5000;

const stripe = new Stripe(process.env.STRIPE_API_SECRET);

connectDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use(
    session({
        secret: "hello",
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000
        }
    })
);

app.use((req, res, next) => {
    if (!req.session.views) {
        req.session.views = 0;
    }
    req.session.views++;
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/people', peopleRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/payments', paymentRoutes)
app.use(errorHandler);


app.listen(port, () => console.log(`Server is listening on port ${port}`));
