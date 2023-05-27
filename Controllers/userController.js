import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils/generateToken.js";
import Randomstring from "randomstring";


const signUp = async(req, res) => {
    try{
        const {name, email, password} = req.body
        const oldUser = await User.findOne({email: email})
        if(oldUser) {
            req.json({message: 'User already Exists'})
        }else{
            const ref = Randomstring.generate({
                length: 6,
                charset: 'alphanumeric'
        })
            const newUser = await new User({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
                ref
            })
            const saveUser =  await newUser.save()
            saveUser ? res.json({message: 'New User Created', newUser, User}) : res.json({message: 'Unable to save User'})
        }
    }catch(err){
        throw new Error(err)
    }
}


const logIn = async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        if(user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if(isMatch && user.status === "active"){
                const token = generateToken(user._id)
                res.json({message: 'LogIn Successful', token, user})
            }else {
                res.json({message: 'Unable to login'})
            }
        }else{
            res.json({message: 'User does not match'})
        }
    }catch(err){
        throw new Error(err)
    }
}


const resetPass = async(req, res) => {
    try{
        const {email} = req.body
        const user = await User.findOne({email: email})
        if(user){
            const otp = Randomstring.generate({
                length: 4,
                charset: "numeric"
            });
            // user.otp = otp;
            await User.findByIdAndUpdate(user._id, {otp: otp}, {new: true, useFindAndModify: false })
            res.json({message: "otp sent to your email", otp, user})
        }else{
            res.json({message: "Email doesn't not exist"})
        }
    }catch(err){
        throw new Error(err)
    }
}

// PHASE 2
const newPass =  async(req, res) => {
    try{
        const {otp, password} = req.body
        const user = await User.findOne({otp: otp})
        if(user){
            const otp2 = Randomstring.generate({
                length: 4,
                charset: "numeric"
            })
            const newPass = await bcrypt.hash(password, 3)
            const updatePass = await User.findByIdAndUpdate(user._id, {password: newPass, otp: otp2}, {new: true, useFindAndModify: false})
            if(updatePass){
                res.json({message: "Password Updated successfully"})
            }else{
                res.json({message: "unable to update password"})
            }
        }else{
            res.json({message: "User otp is broken"})
        }
    }catch(err){
        throw new Error(err)
    }
}

//     // LOGOUT A USER
// const logOut = async(req, res) => {
//     try{
//         const token = req.headers.authorization.split(' ')[1];
//         const user = User.find(user => user.token === token);
//         if(user){
//             user.token = null;
//             res.json({message: "Logged User Out", user })
//         }else {
//             res.json({message: "User unable to logout"})
//         }
//     }catch(err){
//         throw new Error(err)
//     }
// }


export {signUp, logIn, resetPass, newPass,/* logOut, */}