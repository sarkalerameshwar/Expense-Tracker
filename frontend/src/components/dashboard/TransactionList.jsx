import { motion } from 'framer-motion';

const AddTransactionModal = ({ onAdd }) => {
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
    ]
  };

  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount: parseFloat(amount),
      emoji: categories[type].find(c => c.name === category)?.emoji || '💰',
      date: new Date().toLocaleDateString(),
      note
    };
    onAdd(newTransaction);
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setType('expense');
    setCategory('');
    setAmount('');
    setNote('');
  };

  return (
    <>
      {/* Modal Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl w-full max-w-md"
          >
            <form onSubmit={handleSubmit} className="p-6">
              <h3 className="text-xl font-bold mb-4">Add New Transaction</h3>
              
              {/* Transaction Type */}
              <div className="flex mb-4 gap-2">
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-lg ${type === 'income' ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}
                  onClick={() => setType('income')}
                >
                  Income
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-lg ${type === 'expense' ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}
                  onClick={() => setType('expense')}
                >
                  Expense
                </button>
              </div>

              {/* Category Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="grid grid-cols-4 gap-2">
                  {categories[type].map((cat) => (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      key={cat.name}
                      className={`flex flex-col items-center p-2 rounded-lg ${category === cat.name ? 'bg-indigo-100' : 'bg-gray-50'}`}
                      onClick={() => setCategory(cat.name)}
                    >
                      <span className="text-xl">{cat.emoji}</span>
                      <span className="text-xs mt-1">{cat.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Note Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Note (Optional)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Transaction
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default AddTransactionModal;