import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO)

const app = express();

app.get('/', (req, res) => {
    res.send("Helloworld");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
