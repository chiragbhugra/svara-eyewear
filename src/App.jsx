import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { supabase } from './supabaseClient';
import useUserStore from './stores/userStore';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const Collections = lazy(() => import('./components/Collections'));
const ProductPage = lazy(() => import('./components/ProductPage'));
const Auth = lazy(() => import('./components/Auth'));
const Account = lazy(() => import('./components/Account'));
const CartPage = lazy(() => import('./components/CartPage'));

function PrivateRoute({ children }) {
  const user = useUserStore(state => state.user);
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const setUser = useUserStore(state => state.setUser);
  const checkUser = useUserStore(state => state.checkUser);

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser, checkUser]);

  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eyeglasses" element={<Collections />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;