import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import useUserStore from '../stores/userStore';

const AuthCallback = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);

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
  }, [navigate, setUser]);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;


