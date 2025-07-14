import express from "express";
import Expense from "../models/Expense.model.js";

const addExpense = async (req, res) => {
  try {
    const { userId, title, amount, category, type } = req.body;
    if (!title || !amount || !category || !type) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const ExpenseData = new Expense({
      userId : req.user.id,
      title,
      amount,
      category,
      type,
    });
    const result = await ExpenseData.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getExpenses = async (req, res) => {
    try {
        const userId = req.user.id;
        const Expenses = await Expense.find({ userId });
        res.status(200).json(Expenses);

    }catch(error){
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateExpense = async (req, res) => {
  try{
    const expenseId = req.params.id;
    const { title, amount, category, type } = req.body;
    if(!title || !amount || !category || !type){
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const updateExpense = await Expense.findByIdAndUpdate(expenseId, {
      title,
      amount,
      category,
      type
    });
    res.status(200).json(updateExpense);

  }catch(error){
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const deleteExpense = async (req, res) => {
  try{
    const expenseId = req.params.id;
    const expense = await Expense.findByIdAndDelete(expenseId);
    res.status(200).json({success:true, message:"expense deleted successfully"});
    
  }catch(error){
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { addExpense, getExpenses, updateExpense, deleteExpense };
