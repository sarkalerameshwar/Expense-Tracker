import { TransactionList, CategoryBreakdown } from "../transactions/TransactionList";


const ExpenseTab = ({ transactions }) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Expense History</h3>
      <TransactionList transactions={expenseTransactions} />
      <CategoryBreakdown transactions={expenseTransactions} />
    </div>
  );
};

export default ExpenseTab;
