import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type ReportType = 'spending' | 'budget' | 'savings' | 'income';
type TimePeriod = 'week' | 'month' | 'quarter' | 'year';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<ReportType>('spending');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const generateReport = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Financial Reports</h1>
        <p className="text-gray-600 mt-2">
          Generate and view reports to analyze your financial data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Report Options</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as ReportType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="spending">Spending Analysis</option>
                  <option value="budget">Budget Performance</option>
                  <option value="savings">Savings Progress</option>
                  <option value="income">Income Tracking</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Period
                </label>
                <select
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
              </div>

              <button
                onClick={generateReport}
                disabled={isGenerating}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-medium mb-3">Saved Reports</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-blue-600 hover:text-blue-800">
                    Monthly Budget (Jan 2023)
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-blue-600 hover:text-blue-800">
                    Quarterly Spending (Q4 2022)
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-blue-600 hover:text-blue-800">
                    Annual Summary (2022)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {!reportGenerated ? (
            <div className="bg-white rounded-lg shadow p-6 text-center h-full flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Report Generated</h3>
              <p className="text-gray-500 max-w-md">
                Select your report options and click "Generate Report" to view your financial data.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {reportType === 'spending' && 'Spending Analysis'}
                    {reportType === 'budget' && 'Budget Performance'}
                    {reportType === 'savings' && 'Savings Progress'}
                    {reportType === 'income' && 'Income Tracking'}
                    {' - '}
                    {timePeriod === 'week' && 'Last Week'}
                    {timePeriod === 'month' && 'Last Month'}
                    {timePeriod === 'quarter' && 'Last Quarter'}
                    {timePeriod === 'year' && 'Last Year'}
                  </h2>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                      Export PDF
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                      Export CSV
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Spending</p>
                      <p className="text-2xl font-bold">$2,345.67</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Budget Utilization</p>
                      <p className="text-2xl font-bold">78%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Top Category</p>
                      <p className="text-2xl font-bold">Groceries</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart placeholder - would display actual chart in real implementation</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Transactions</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            2023-01-15
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Grocery Store
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Groceries
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $125.42
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            2023-01-12
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Electric Bill
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Utilities
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $95.00
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            2023-01-10
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Restaurant
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Dining Out
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $78.35
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports; 