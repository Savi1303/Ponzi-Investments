import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils/generateToken.js";

const signUp = async(req, res) => {
    try{
        const {name, email, password} = req.body
        const oldAdmin = await Admin.findOne({email: email})
        if(oldAdmin) {
            req.json({message: 'Admin already Exists'})
        }else{         
            const newAdmin = await new Admin({
                name,
                email,
                password: bcrypt.hashSync(password, 10)
            })
            const saveAdmin =  await newAdmin.save()
            saveAdmin ? res.json({message: 'New Admin Created', newAdmin, Admin}) : res.json({message: 'Unable to save Admin'})
        }
    }catch(err){
        throw new Error(err)
    }
}


const logIn = async(req, res) => {
    try{
        const {email, password} = req.body
        const admin = await Admin.findOne({email: email})
        if(admin) {
            const isMatch = await bcrypt.compare(password, admin.password)
            if(isMatch){
                const token = generateToken(admin._id)
                res.json({message: 'LogIn Successful', token, admin})
            }else {
                res.json({message: 'Unable to login'})
            }
        }else{
            res.json({message: 'Admin does not match'})
        }
    }catch(err){
        throw new Error(err)
    }
}


const deleteUser = async(req, res) => {
    try{
        const user = await User.findOne({_id: req.params.id})
        if(user){
            const deleteUser = await User.findByIdAndDelete(user._id)
            if(deleteUser){
                res.json({message: "User Deleted", deleteUser, User})
            }else{
                res.json({message: "Unable to delete User"})
            }
        }else{
            res.json({message: "Unable to find User"})
        }
    }catch{
        throw new Error(err)
    }
}

export {signUp, logIn, deleteUser}