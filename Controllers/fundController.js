import User from "../models/userModel.js";
import Funds from "../models/fundsModel.js";
import Randomstring from "randomstring";



// MAKE A PAYMENT
const deposit = async(req, res) => {
    try{
        const {email, wallet} = req.body
        const user = await User.findOne({email: email})
        if(user) {
            // const amount = await new wallet.findOneAndUpdate(wallet)
            const payment = await User.findOneAndUpdate({wallet : wallet + wallet})
            if(payment) {
             res.json({message: "Deposit successful", wallet, user})   
            }else{
                res.json({message:"Unable to confirm deposit"})
            }  
        }else{
            res.json({message: "Unable to find user"})
        }
    }catch(err){
        throw new Error(err)
    }
}


const fund = async(req, res) => {
    try{
        const {amount} = req.body
        const payRef = Randomstring.generate({
            length: 10,
            charset: 'alphanumeric'
        })
        const newFund = await new Funds({
            amount,
            payRef,
            datePaid: new Date.now()

        })
        const saveFund = await newFund.save()
            if(saveFund){
                res.json({message: "order registered", saveFund})
              }
              else{
                res.status(400).json({message: "unable to save your order"})
              }
    }catch(err){
        throw new Error(err)
    }
}
export {deposit, fund}
