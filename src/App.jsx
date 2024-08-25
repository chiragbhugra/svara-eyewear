import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Collections from './components/Collections';
import ProductPage from './components/ProductPage';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eyeglasses" element={<Collections />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </Router>
  )
}

export default App