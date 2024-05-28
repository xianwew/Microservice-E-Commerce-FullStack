import './App.css';
import { useEffect, useState } from 'react';
import ProtectedRoute from './App/Auth/ProtectedRoute';
import { AuthProvider } from './App/Auth/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './App/Compoents/Header/Header';
import HomePage from './App/Pages/HomePage/HomePage';
import Footer from './App/Compoents/Footer/Footer';
import BrowsePage from './App/Pages/BrowsingPage/BrowsingPage';
import ItemDetailsPage from './App/Pages/ItemDetailsPage/ItemDetailsPage';
import UserProfilePage from './App/Pages/UserProfilePage/UserProfilePage';
import SellPage from './App/Pages/SellPage/SellPage';
import SellerProfilePage from './App/Pages/SellerProfilePage/SellerProfilePage';
import CartPage from './App/Pages/CartPage/CartPage';
import UserReceiptPage from './App/Pages/UserReceiptPage/UserReceiptPage';
import EditItemPage from './App/Pages/EditItemPage/EditItemPage';
import CheckoutPage from './App/Pages/CheckoutPage/CheckoutPage';
import { setAuthenticated } from './App/redux/slice/authSlice';
import { showSnackbar } from './App/redux/slice/snackbarSlice';
import SnackbarComponent from './App/Compoents/SnackBars/SnackbarComponent';
import { fetchUser } from './App/service/UserService';
import { setUser } from './App/redux/slice/authSlice';

export default function App() {
  const isWide = useSelector(state => state.windowSize.isWide);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('Fetching user data!');
      if (token) {
        try {
          const userData = await fetchUser();
          dispatch(setUser({ user: userData }));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [token, dispatch]);

  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className={`app-container`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/item/:id" element={<ItemDetailsPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/item/:itemId/edit" element={<EditItemPage />} />
              <Route path="/receipt/:receiptId" element={<UserReceiptPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
            <Route path="/seller-profile/:id" element={<SellerProfilePage />} />
          </Routes>
        </div>
        <Footer />
        <SnackbarComponent />
      </Router>
    </AuthProvider>
  );
} 