import mongoose from 'mongoose';


const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDb;
