import mongoose, { mongo } from "mongoose";


//User Schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type:String,
        default: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
    },

}, 
// shows the time when created and edited in db
{timestamps: true});


// USer Model
const User = mongoose.model('User',userSchema);

export default User;