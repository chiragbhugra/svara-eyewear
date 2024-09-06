import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { supabase } from './supabaseClient';
import useUserStore from './stores/userStore';
import PrivateRoute from './components/PrivateRoute';
import AuthComponent from './components/Auth';
import Account from './components/Account';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const Collections = lazy(() => import('./components/Collections'));
const ProductPage = lazy(() => import('./components/ProductPage'));
const CartPage = lazy(() => import('./components/CartPage'));

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eyeglasses" element={<Collections />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/auth" element={<AuthComponent />} />
          <Route element={<PrivateRoute />}>
            <Route path="/account" element={<Account key={session?.user?.id} session={session} />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;