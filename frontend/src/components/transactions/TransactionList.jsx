import { motion } from 'framer-motion';

const TransactionList = ({ transactions }) => {
  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <motion.div
          key={transaction.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{transaction.emoji}</span>
            <div>
              <p className="font-medium">{transaction.category}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
          </div>
          <div className={`font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
            {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const CategoryBreakdown = ({ transactions }) => {
  const categories = [...new Set(transactions.map(t => t.category))];
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-6"
    >
      <h4 className="text-md font-semibold mb-3">Category Breakdown</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map(category => {
          const categoryTransactions = transactions.filter(t => t.category === category);
          const total = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
          const emoji = categoryTransactions[0]?.emoji || '💰';
          
          return (
            <motion.div 
              whileHover={{ scale: 1.03 }}
              key={category}
              className="bg-gray-50 p-3 rounded-lg flex flex-col items-center"
            >
              <span className="text-2xl mb-1">{emoji}</span>
              <p className="font-medium text-sm">{category}</p>
              <p className="text-red-500 text-sm">${total}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export {CategoryBreakdown, TransactionList};