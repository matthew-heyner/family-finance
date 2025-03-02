import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';

// Pages
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import Expenses from '@/pages/expenses/Expenses';
import ExpenseDetail from '@/pages/expenses/ExpenseDetail';
import AddExpense from '@/pages/expenses/AddExpense';
import Budgets from '@/pages/budgets/Budgets';
import BudgetDetail from '@/pages/budgets/BudgetDetail';
import CreateBudget from '@/pages/budgets/CreateBudget';
import Reports from '@/pages/reports/Reports';
import Profile from '@/pages/profile/Profile';
import FamilySettings from '@/pages/settings/FamilySettings';
import NotFound from '@/pages/NotFound';

// Redux
import { RootState, AppDispatch } from '@/store';
import { checkAuth } from '@/store/slices/authSlice';

// Components
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoadingScreen from '@/components/ui/LoadingScreen';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on app load
    dispatch(checkAuth());
    setAppReady(true);
  }, [dispatch]);

  if (!appReady || loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
        <Route path="/reset-password/:token" element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/dashboard" />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Expenses */}
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/add" element={<AddExpense />} />
          <Route path="/expenses/:id" element={<ExpenseDetail />} />
          
          {/* Budgets */}
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/budgets/create" element={<CreateBudget />} />
          <Route path="/budgets/:id" element={<BudgetDetail />} />
          
          {/* Reports */}
          <Route path="/reports" element={<Reports />} />
          
          {/* Profile & Settings */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings/family" element={<FamilySettings />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App; 