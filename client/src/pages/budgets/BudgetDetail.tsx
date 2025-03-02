import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
}

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  period: string;
  startDate: string;
  endDate: string;
  categories: BudgetCategory[];
}

const BudgetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState<Budget | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data - would be replaced with actual API call
      setBudget({
        id: id || '1',
        name: 'Monthly Household Budget',
        amount: 2000,
        spent: 1250,
        period: 'Monthly',
        startDate: '2023-01-01',
        endDate: '2023-01-31',
        categories: [
          { name: 'Groceries', allocated: 500, spent: 420 },
          { name: 'Utilities', allocated: 300, spent: 280 },
          { name: 'Entertainment', allocated: 200, spent: 150 },
          { name: 'Transportation', allocated: 300, spent: 275 },
          { name: 'Dining Out', allocated: 200, spent: 125 },
          { name: 'Miscellaneous', allocated: 500, spent: 0 }
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      // Delete logic would go here
      navigate('/budgets');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2">Loading budget details...</p>
        </div>
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Budget Not Found</h2>
          <p className="text-gray-600 mb-4">The budget you're looking for doesn't exist or has been deleted.</p>
          <Link to="/budgets" className="text-blue-600 hover:text-blue-800 font-medium">
            Return to Budgets
          </Link>
        </div>
      </div>
    );
  }

  const percentUsed = Math.round((budget.spent / budget.amount) * 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link to="/budgets" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
            &larr; Back to Budgets
          </Link>
          <h1 className="text-3xl font-bold">{budget.name}</h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <Link
            to={`/budgets/${budget.id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold">${budget.amount}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Spent So Far</p>
                <p className="text-2xl font-bold">${budget.spent}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Remaining</p>
                <p className="text-2xl font-bold">${budget.amount - budget.spent}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>${budget.spent} spent</span>
                <span>${budget.amount} budget</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    percentUsed > 90 ? 'bg-red-600' : percentUsed > 70 ? 'bg-yellow-500' : 'bg-green-600'
                  }`}
                  style={{ width: `${Math.min(100, percentUsed)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{percentUsed}% of budget used</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
            <div className="space-y-4">
              {budget.categories.map((category) => {
                const categoryPercentUsed = Math.round((category.spent / category.allocated) * 100);
                return (
                  <div key={category.name} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{category.name}</span>
                      <span>
                        ${category.spent} / ${category.allocated} ({categoryPercentUsed}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          categoryPercentUsed > 90
                            ? 'bg-red-600'
                            : categoryPercentUsed > 70
                            ? 'bg-yellow-500'
                            : 'bg-green-600'
                        }`}
                        style={{ width: `${Math.min(100, categoryPercentUsed)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Budget Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Period</p>
                <p className="font-medium">{budget.period}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{budget.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium">{budget.endDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="space-y-3">
              <Link
                to={`/reports/budget/${budget.id}`}
                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                View Reports
              </Link>
              <Link
                to={`/expenses?budgetId=${budget.id}`}
                className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                View Related Expenses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetDetail; 