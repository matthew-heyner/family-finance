import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  period: string;
  category: string;
}

const Budgets: React.FC = () => {
  // Mock data - would be replaced with API call in real implementation
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      name: 'Monthly Groceries',
      amount: 500,
      spent: 320,
      period: 'Monthly',
      category: 'Food'
    },
    {
      id: '2',
      name: 'Entertainment',
      amount: 200,
      spent: 150,
      period: 'Monthly',
      category: 'Entertainment'
    },
    {
      id: '3',
      name: 'Transportation',
      amount: 300,
      spent: 275,
      period: 'Monthly',
      category: 'Transportation'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <Link
          to="/budgets/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Budget
        </Link>
      </div>

      {budgets.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 mb-4">You don't have any budgets yet.</p>
          <Link
            to="/budgets/create"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Create your first budget
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <Link
              to={`/budgets/${budget.id}`}
              key={budget.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{budget.name}</h2>
                <p className="text-gray-600 mb-1">
                  Category: <span className="font-medium">{budget.category}</span>
                </p>
                <p className="text-gray-600 mb-3">
                  Period: <span className="font-medium">{budget.period}</span>
                </p>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>${budget.spent} spent</span>
                    <span>${budget.amount} budget</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        (budget.spent / budget.amount) > 0.9 
                          ? 'bg-red-600' 
                          : (budget.spent / budget.amount) > 0.7 
                            ? 'bg-yellow-500' 
                            : 'bg-green-600'
                      }`}
                      style={{ width: `${Math.min(100, (budget.spent / budget.amount) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500">
                  {Math.round((budget.spent / budget.amount) * 100)}% of budget used
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Budgets; 