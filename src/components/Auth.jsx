import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/userStore';

export default function AuthComponent() {
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
        navigate('/');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-24">
      <div className="w-full max-w-md">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']}
          redirectTo={`${window.location.origin}/auth/callback`}
        />
      </div>
    </div>
  );
}
