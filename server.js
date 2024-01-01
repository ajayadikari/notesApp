import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js';
import notesRouter from './routes/notesRoutes.js'
import userRouter from './routes/authRoutes.js'
import morgan from 'morgan';


//server instance
const app = express()

//environmental variables configuration
dotenv.config();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan())


//routes
app.use('/api/v1/notes', notesRouter);
app.use('/api/v1/auth', userRouter);

//db connection
connectDb();


//server
const port = process.env.PORT;
try {
    app.listen(port);
    console.log("server is connected to port: ", port);
} catch (error) {
    console.log("error while connecting to server")
    console.log(error)
}
