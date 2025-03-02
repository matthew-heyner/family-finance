import axios from 'axios';

/**
 * Sets the authentication token in axios headers
 * @param token JWT token or null to remove the token
 */
export const setAuthToken = (token: string | null): void => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

/**
 * Formats user name for display
 * @param firstName First name
 * @param lastName Last name
 * @returns Formatted full name
 */
export const formatUserName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

/**
 * Checks if the user has the required role
 * @param userRole Current user's role
 * @param requiredRoles Array of roles that have access
 * @returns Boolean indicating if user has access
 */
export const hasRole = (
  userRole: 'admin' | 'member' | 'child',
  requiredRoles: ('admin' | 'member' | 'child')[]
): boolean => {
  return requiredRoles.includes(userRole);
};

/**
 * Checks if the current time is past the token expiration
 * @param exp Expiration timestamp from JWT
 * @returns Boolean indicating if token is expired
 */
export const isTokenExpired = (exp: number): boolean => {
  const currentTime = Date.now() / 1000;
  return exp < currentTime;
}; 