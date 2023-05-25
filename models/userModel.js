import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {type: String, required: true}, 
    email: {type: String, required: true},
    password: {type: String, required: true},
    ref:  {type: String},
    wallet: {type: Number, default: 0, required: true},  
    otp: {type: String},
    status: {type: String, default: 'active', required: true},
  },
  {
    timestamps: true,
  }
);



const User = mongoose.model('User', userSchema)

export default User