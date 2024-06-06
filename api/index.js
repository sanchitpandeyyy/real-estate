import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// importing api's
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"

// connecting to mongodb
mongoose.connect(process.env.MONGO)

app.use(express.json())

//listening to port
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Routing to apis
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)


//middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})