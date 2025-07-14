import mongoose from 'mongoose';
import User from './user.model.js';

const expenseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['income','expense'],
        required:true
    },
},  
    {timestamps: true}
)

const Expense = mongoose.model('expense', expenseSchema);
export default Expense;