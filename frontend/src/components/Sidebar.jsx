import React from "react";
import { FaHome, FaChartPie, FaWallet, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => (
  <aside className="h-screen w-64 bg-indigo-950 text-white flex flex-col justify-between shadow-lg fixed left-0 top-0">
    <div>
      <div className="flex items-center gap-3 px-6 py-8 border-b border-indigo-900">
        <span className="text-2xl">💸</span>
        <h2 className="text-xl font-bold tracking-wide">Expense Tracker</h2>
      </div>
      <nav className="flex flex-col gap-2 mt-8 px-4">
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-900 font-medium hover:bg-indigo-800 transition">
          <FaHome className="text-lg" /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition">
          <FaChartPie className="text-lg" /> Analytics
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition">
          <FaWallet className="text-lg" /> Transactions
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition">
          <FaCog className="text-lg" /> Settings
        </a>
      </nav>
    </div>
    <div className="px-6 py-6 border-t border-indigo-900">
      <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition">
        <FaSignOutAlt className="text-lg" /> Logout
      </a>
    </div>
  </aside>
);

export default Sidebar;