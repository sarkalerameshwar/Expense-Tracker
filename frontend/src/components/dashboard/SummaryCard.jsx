const SummaryCard = ({ title, amount, icon, trend }) => {
  return (
    <div 
      className="bg-white p-4 rounded-xl shadow-sm"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">${amount.toLocaleString()}</p>
        </div>
        <div className={`p-2 rounded-lg ${trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? '↑ 12%' : '↓ 8%'} from last month
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
