import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, LineChart } from '../charts/ChartComponents';
import { FiPlus, FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';
import sampleTransactions from '../../data/SampleData';
import SummaryCard from './SummaryCard';
import OverviewTab from './OverviewTab';
import IncomeTab from './IncomeTab';
import ExpenseTab from './Expense';
import { TransactionList, CategoryBreakdown } from '../transactions/TransactionList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
    type: 'expense',
  });
  
  // Sample data - replace with your actual data
  const monthlyData = [
    { month: 'Jan', income: 4500, expense: 3200 },
    { month: 'Feb', income: 5200, expense: 3800 },
    { month: 'Mar', income: 4800, expense: 4200 },
    { month: 'Apr', income: 5300, expense: 3900 },
    { month: 'May', income: 4900, expense: 4100 },
  ];

  const categoryData = [
    { name: 'Food', value: 35, emoji: '🍔' },
    { name: 'Transport', value: 20, emoji: '🚕' },
    { name: 'Shopping', value: 25, emoji: '🛍️' },
    { name: 'Bills', value: 15, emoji: '💡' },
    { name: 'Entertainment', value: 5, emoji: '🎬' },
  ];

  const addTransaction = (newTransaction) => {
    console.log('Adding transaction:', newTransaction);
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
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
                {categoryData.map((cat) => (
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
            amount={12500} 
            icon={<FiDollarSign className="text-blue-500" />} 
            trend="up" 
          />
          <SummaryCard 
            title="Income" 
            amount={7800} 
            icon={<FiTrendingUp className="text-green-500" />} 
            trend="up" 
          />
          <SummaryCard 
            title="Expenses" 
            amount={5300} 
            icon={<FiTrendingDown className="text-red-500" />} 
            trend="down" 
          />
        </div>

        {/* Navigation Tabs */}
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
    </motion.div>
  );
};

export default Dashboard;
