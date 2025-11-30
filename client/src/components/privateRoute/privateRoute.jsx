import { Navigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/AuthContext';

export default function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuthenticated();

    if (!isAuthenticated) return <Navigate to='/auth' />;
    return children;
}
