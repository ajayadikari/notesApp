import mongoose from "mongoose";
import dotenv from 'dotenv'


const connectDb = async () => {
    dotenv.config();
    try {
        const url = process.env.DB;
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("db connection successfull")
    } catch (error) {
        console.log("error occured while connecting to db")
        console.log(error)
    }
}


export default connectDb;