import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const ProtectedRoute = () => {
  const { user } = useAuth();

  // Si no hay usuario logueado, lo mandamos a /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, renderizamos la ruta que intentaba visitar
  return <Outlet />;
};

export default ProtectedRoute;