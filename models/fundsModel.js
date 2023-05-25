import mongoose from 'mongoose'

const fundSchema = mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, 
    amount: {type: Number, required: true},
    payRef: {type: Number, required: true},
    datePaid: {type: String, default: new Date, required: true},
  },
  {
    timestamps: true,
  }
);



const Funds = mongoose.model('Funds', fundSchema)

export default Funds