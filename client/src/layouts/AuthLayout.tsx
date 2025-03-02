import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

/**
 * Layout component for authentication pages
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="py-4 px-6 bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Family Finance
          </Link>
          <div>
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mr-4">
              Login
            </Link>
            <Link to="/register" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 bg-white dark:bg-gray-800 shadow-inner">
        <div className="container mx-auto text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Family Finance App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout; 