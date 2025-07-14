import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js'
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from '../controllers/expense.controller.js';

const router = express.Router();

router.post('/add',authMiddleware, addExpense);

router.get('/',authMiddleware, getExpenses);

router.put('/:id',authMiddleware, updateExpense);

router.delete('/:id', authMiddleware, deleteExpense);

export default router;