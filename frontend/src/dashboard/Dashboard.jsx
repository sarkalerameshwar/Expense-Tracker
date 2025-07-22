import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const initialTransactions = [
  { id: 1, name: "Groceries", amount: -80, date: "2025-07-20" },
  { id: 2, name: "Salary", amount: 2000, date: "2025-07-18" },
  { id: 3, name: "Electricity Bill", amount: -120, date: "2025-07-15" },
];

const Dashboard = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [form, setForm] = useState({ name: "", amount: "", date: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.date) return;
    setTransactions([
      {
        id: Date.now(),
        name: form.name,
        amount: Number(form.amount),
        date: form.date,
      },
      ...transactions,
    ]);
    setForm({ name: "", amount: "", date: "" });
  };

  const totalBalance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const monthlyExpenses = transactions
    .filter((t) => t.amount < 0 && t.date.startsWith("2025-07"))
    .reduce((acc, t) => acc + t.amount, 0);

  const monthlyIncome = transactions
    .filter((t) => t.amount > 0 && t.date.startsWith("2025-07"))
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold text-indigo-950 mb-8">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
            <span className="text-2xl mb-2">🧮</span>
            <span className="text-sm text-gray-500 mb-2">Total Balance</span>
            <span className="text-2xl font-bold text-indigo-900">
              ${totalBalance}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
            <span className="text-2xl mb-2">💰</span>
            <span className="text-sm text-gray-500 mb-2">Total Income</span>
            <span className="text-2xl font-bold text-green-600">
              ${totalIncome}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
            <span className="text-2xl mb-2">💸</span>
            <span className="text-sm text-gray-500 mb-2">Total Expense</span>
            <span className="text-2xl font-bold text-red-500">
              ${Math.abs(totalExpense)}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
            <span className="text-2xl mb-2">📅</span>
            <span className="text-sm text-gray-500 mb-2">This Month</span>
            <span className="text-base text-green-600">
              Income: ${monthlyIncome}
            </span>
            <span className="text-base text-red-500">
              Expense: ${Math.abs(monthlyExpenses)}
            </span>
          </div>
        </div>

        {/* Quick Add Expense */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-indigo-950 mb-4">
            Quick Add Expense
          </h2>
          <form
            className="flex flex-col md:flex-row gap-4"
            onSubmit={handleAdd}
          >
            <input
              type="text"
              name="name"
              placeholder="Expense Name"
              className="border rounded-lg px-4 py-2 flex-1"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="border rounded-lg px-4 py-2 flex-1"
              value={form.amount}
              onChange={handleChange}
            />
            <select
              name="type"
              className="border rounded-lg px-4 py-2 flex-1"
              value={form.type}
              onChange={handleChange}
            >
              <option value="expense">💸 Expense</option>
              <option value="income">💰 Income</option>
            </select>
            <button
              type="submit"
              className="bg-indigo-900 text-white px-6 py-2 rounded-lg hover:bg-indigo-800 transition"
            >
              Add
            </button>
          </form>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-indigo-950 mb-4">
            Recent Transactions
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Name</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 6).map((t) => (
                <tr key={t.id} className="border-b last:border-none">
                  <td className="py-2">{t.date}</td>
                  <td className="py-2">{t.name}</td>
                  <td
                    className={`py-2 font-semibold ${t.amount < 0 ? "text-red-500" : "text-green-500"}`}
                  >
                    {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount)}
                  </td>
                  <td className="py-2 text-xl">
                    {t.amount < 0 ? "💸 Expense" : "💰 Income"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
