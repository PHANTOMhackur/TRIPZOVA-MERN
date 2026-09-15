import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { roleHome } from '../utils/auth.js';
import Loader from './Loader.jsx';

export default function ProtectedRoute({ children, roles }) {
  const location = useLocation();
  const { token, user, checkingSession } = useAuth();

  if (checkingSession) {
    return <Loader label="Checking your session..." />;
  }

  if (!token || (roles?.length && !user)) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to={roleHome(user.role)} replace />;
  }

  return children;
}
