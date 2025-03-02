import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    // TODO: Implement password reset request logic
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-md w-full mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>
      
      {isSubmitted ? (
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <p className="text-blue-800">
            If an account exists with the email <strong>{email}</strong>, you will receive password reset instructions.
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6 text-center">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        </>
      )}
      
      <p className="mt-4 text-center text-sm text-gray-600">
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Back to Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword; 