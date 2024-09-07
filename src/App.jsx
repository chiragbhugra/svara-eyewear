import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { supabase } from './supabaseClient';
import useUserStore from './stores/userStore';
import PrivateRoute from './components/PrivateRoute';
import AuthComponent from './components/Auth';
import AuthCallback from './components/AuthCallback';
import useCartStore from './stores/cartStore';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const Collections = lazy(() => import('./components/Collections'));
const ProductPage = lazy(() => import('./components/ProductPage'));
const CartPage = lazy(() => import('./components/CartPage'));
const Account = lazy(() => import('./components/Account'));

function App() {
  const setUser = useUserStore(state => state.setUser);
  const fetchCart = useCartStore(state => state.fetchCart);

  useEffect(() => {
    // You might want to check if the user is logged in when the app starts
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) fetchCart();
    };
    checkUser();
  }, [setUser, fetchCart]);

  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eyeglasses" element={<Collections />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/auth" element={<AuthComponent />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route element={<PrivateRoute />}>
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;