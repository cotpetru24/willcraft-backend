import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB ${connect.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDb;
