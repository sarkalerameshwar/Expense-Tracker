import { motion } from 'framer-motion';
import {LineChart,PieChart } from '../charts/ChartComponents';
import { TransactionList } from '../transactions/TransactionList';

const OverviewTab = ({ monthlyData, categoryData, transactions }) => {
  return (
    <div className="space-y-6">
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
          <LineChart data={monthlyData} />
        </motion.div>

        {/* Pie Chart */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-4 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          <PieChart data={categoryData} />
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-4 rounded-xl shadow-sm"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <TransactionList transactions={transactions.slice(0, 5)} />
      </motion.div>
    </div>
  );
};

export default OverviewTab;