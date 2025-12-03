import { Navigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/AuthContext';

export default function TypeRoute({ children, isPrivate = false }) {
    const { isAuthenticated } = useAuthenticated();

    if (isPrivate && !isAuthenticated) return <Navigate to='/auth' />;
    if (!isPrivate && isAuthenticated) return <Navigate to='/dash' />;
    return children;
}
