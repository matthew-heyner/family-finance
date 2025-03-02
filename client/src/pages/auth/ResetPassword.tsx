import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const { password, confirmPassword } = formData;

  useEffect(() => {
    // Validate token on component mount
    if (!token) {
      setError('Invalid or expired password reset token');
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    console.log('Reset password with token:', token, 'and new password:', password);
    // TODO: Implement password reset logic
    setIsSubmitted(true);
  };

  if (error && !token) {
    return (
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-red-800">{error}</p>
        </div>
        <p className="text-center">
          <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
            Request a new password reset link
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Set New Password</h1>
      
      {isSubmitted ? (
        <div className="bg-green-50 p-4 rounded-md mb-6">
          <p className="text-green-800">
            Your password has been successfully reset.
          </p>
          <p className="mt-4 text-center">
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Go to Login
            </Link>
          </p>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-50 p-4 rounded-md mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPassword; 