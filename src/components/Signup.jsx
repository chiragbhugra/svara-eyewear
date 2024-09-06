import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert('Signup successful! Please check your email for verification.');
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup}>
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-6 border rounded"
      />
      <button type="submit" disabled={loading} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
    </form>
  );
}
