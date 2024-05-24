import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Header from './App/Compoents/Header/Header';
import HomePage from './App/Pages/HomePage/HomePage';
import Footer from './App/Compoents/Footer/Footer';
import BrowsePage from './App/Pages/BrowsingPage/BrowsingPage';
import ItemDetailsPage from './App/Pages/ItemDetailsPage/ItemDetailsPage';
import UserProfilePage from './App/Pages/UserProfilePage/UserProfilePage';
import SellPage from './App/Pages/SellPage/SellPage';
import SellerProfilePage from './App/Pages/SellerProfilePage/SellerProfilePage';
import CartPage from './App/Pages/CartPage/CartPage';

export default function App() {
  const isWide = useSelector(state => state.windowSize.isWide);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/item/:id" element={<ItemDetailsPage />} />
          <Route path="/profile/:id" element={<UserProfilePage  />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/seller-profile/:id" element={<SellerProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
