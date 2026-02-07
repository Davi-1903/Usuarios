import { Navigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/authContext';
import type { ProtectedRouteProps } from '../../interfaces/Props';

export default function ProtectedRoute({ children, isPrivate }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuthenticated();

    if (isPrivate && !isAuthenticated) return <Navigate to='/auth' />;
    if (!isPrivate && isAuthenticated) return <Navigate to='/dash' />;
    return children;
}
