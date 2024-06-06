import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";

export const auth = async (req, res, next) => {

    const { username, email, password } = req.body;

    //encrypting password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save();

        res.status(201).json("User Created Successfully")
    } catch (error) {
      
      //error form middleware
        next(error)
    }

}


//logics are written in controllers