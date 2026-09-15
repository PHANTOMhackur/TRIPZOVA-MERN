import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';
import { clearStoredAuth, getStoredToken, getStoredUser } from '../utils/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [checkingSession, setCheckingSession] = useState(() => Boolean(getStoredToken()));

  const refreshAuth = () => {
    setToken(getStoredToken());
    setUser(getStoredUser());
  };

  const logout = () => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
    setCheckingSession(false);
  };

  useEffect(() => {
    if (!token) {
      setCheckingSession(false);
      return;
    }

    let active = true;
    setCheckingSession(true);

    api.get('/auth/me')
      .then((response) => {
        if (!active) return;
        const serverUser = response.data?.user || null;
        if (serverUser) {
          localStorage.setItem('tripzovaUser', JSON.stringify(serverUser));
          setUser(serverUser);
        }
      })
      .catch((error) => {
        if (!active) return;
        if (error.response?.status === 401 || error.response?.status === 403) {
          clearStoredAuth();
          setToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });

    return () => { active = false; };
  }, [token]);

  const value = useMemo(
    () => ({ token, user, checkingSession, refreshAuth, logout }),
    [token, user, checkingSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
