import {jwtDecode as jwt_decode} from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    return jwt_decode(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const isAuthenticated = (token) => {
  if (!token) {
      return false;
  }

  try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      // Check if the token has expired
      if (decoded.exp < currentTime) {
          return false;
      }

      return true;
  } catch (error) {
      console.error('Failed to decode token:', error);
      return false;
  }
};