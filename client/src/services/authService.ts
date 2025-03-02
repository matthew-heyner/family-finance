import axios from 'axios';

const API_URL = '/api/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  familyName?: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
}

/**
 * Service for authentication-related API calls
 */
const authService = {
  /**
   * Login user
   * @param credentials User credentials
   * @returns Promise with token and user data
   */
  login: async (credentials: LoginCredentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  /**
   * Register new user
   * @param userData User registration data
   * @returns Promise with token and user data
   */
  register: async (userData: RegisterData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  /**
   * Get current user data
   * @returns Promise with user data
   */
  getCurrentUser: async () => {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  },

  /**
   * Send password reset email
   * @param data Email address
   * @returns Promise with success message
   */
  forgotPassword: async (data: ForgotPasswordData) => {
    const response = await axios.post(`${API_URL}/forgot-password`, data);
    return response.data;
  },

  /**
   * Reset password with token
   * @param data Reset password data with token
   * @returns Promise with success message
   */
  resetPassword: async (data: ResetPasswordData) => {
    const response = await axios.post(`${API_URL}/reset-password`, data);
    return response.data;
  },

  /**
   * Verify email address
   * @param token Verification token
   * @returns Promise with success message
   */
  verifyEmail: async (token: string) => {
    const response = await axios.get(`${API_URL}/verify-email/${token}`);
    return response.data;
  },
};

export default authService; 