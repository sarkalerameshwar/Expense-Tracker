import { TransactionList, CategoryBreakdown } from "../transactions/TransactionList";

const IncomeTab = ({ transactions }) => {
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Income History</h3>
      <TransactionList transactions={incomeTransactions} />
    </div>
  );
};

export default IncomeTab;

