import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, LineChart } from '../charts/ChartComponents';
import { FiPlus, FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';
import SummaryCard from './SummaryCard';
import OverviewTab from './OverviewTab';
import IncomeTab from './IncomeTab';
import ExpenseTab from './Expense';
import { TransactionList, CategoryBreakdown } from '../transactions/TransactionList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
    type: 'expense',
  });

  const categories = {
    income: [
      { name: 'Salary', emoji: '💼' },
      { name: 'Freelance', emoji: '👨‍💻' },
      { name: 'Investment', emoji: '📈' },
      { name: 'Gift', emoji: '🎁' },
    ],
    expense: [
      { name: 'Food', emoji: '🍔' },
      { name: 'Transport', emoji: '🚕' },
      { name: 'Shopping', emoji: '🛍️' },
      { name: 'Bills', emoji: '💡' },
      { name: 'Entertainment', emoji: '🎬' },
    ],
  };

  const formatMonth = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { year: 'numeric', month: 'short' });
  };

  const monthlyMap = {};
  transactions.forEach(t => {
    const month = formatMonth(t.date);
    if (!monthlyMap[month]) {
      monthlyMap[month] = { month, income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      monthlyMap[month].income += t.amount;
    } else if (t.type === 'expense') {
      monthlyMap[month].expense += t.amount;
    }
  });
  const monthlyData = Object.values(monthlyMap);

  const categoryMap = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    if (!categoryMap[t.category]) {
      categoryMap[t.category] = 0;
    }
    categoryMap[t.category] += t.amount;
  });
  const categoryData = Object.entries(categoryMap).map(([key, value]) => ({
    id: key,
    label: key,
    value,
  }));

  const addTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      type: formData.type,
    };
    addTransaction(newTransaction);
    setShowAddForm(false);
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: '',
      type: 'expense',
    });
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">💰 Expense Tracker</h1>
          <button
            className="bg-white text-indigo-600 px-5 py-3 rounded-full flex items-center gap-3 shadow-md hover:bg-indigo-100 transition"
            onClick={() => setShowAddForm(true)}
          >
            <FiPlus size={20} /> Add Transaction
          </button>
        </div>
      </header>

      {/* Add Transaction Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="" disabled>Select category</option>
                  {categories[formData.type].map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.emoji} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || new Date().toISOString().split('T')[0]}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard 
            title="Total Balance" 
            amount={totalBalance} 
            icon={<FiDollarSign className="text-blue-500" />} 
            trend={totalBalance >= 0 ? "up" : "down"} 
          />
          <SummaryCard 
            title="Income" 
            amount={totalIncome} 
            icon={<FiTrendingUp className="text-green-500" />} 
            trend="up" 
          />
          <SummaryCard 
            title="Expenses" 
            amount={totalExpense} 
            icon={<FiTrendingDown className="text-red-500" />} 
            trend="down" 
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          {['overview', 'income', 'expense'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 font-semibold ${activeTab === tab ? 'text-indigo-600 border-b-4 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          {activeTab === 'overview' && (
            <OverviewTab 
              monthlyData={monthlyData} 
              categoryData={categoryData} 
              transactions={transactions} 
            />
          )}
          {activeTab === 'income' && <IncomeTab transactions={transactions} />}
          {activeTab === 'expense' && <ExpenseTab transactions={transactions} />}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
