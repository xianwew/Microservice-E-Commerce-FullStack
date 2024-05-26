import {jwtDecode as jwt_decode} from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    return jwt_decode(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
