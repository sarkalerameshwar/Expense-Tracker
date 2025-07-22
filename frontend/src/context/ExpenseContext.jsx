// src/context/ExpenseContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const res = await axios.get('/api/expenses', {
        headers: { Authorization: `${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error('Failed to fetch expenses', err);
    }
  };

  // Fetch income
  const fetchIncome = async () => {
    try {
      const res = await axios.get('/api/income', {
        headers: { Authorization: `${token}` },
      });
      setIncome(res.data);
    } catch (err) {
      console.error('Failed to fetch income', err);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const res = await axios.post('/api/expenses', expenseData, {
        headers: { Authorization: `${token}` },
      });
      setExpenses([...expenses, res.data]);
    } catch (err) {
      console.error('Error adding expense', err);
    }
  };

  const value = {
    expenses,
    income,
    fetchExpenses,
    fetchIncome,
    addExpense,
    token,
    setToken,
  };

  useEffect(() => {
    if (token) {
      fetchExpenses();
      fetchIncome();
    }
  }, [token]);

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
