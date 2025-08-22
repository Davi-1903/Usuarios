import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function PrivateRoute({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        fetch('/api/session', { credentials: 'include' }).then(res =>
            setAuthenticated(res.status === 200)
        );
    }, []);

    if (isAuthenticated === null) return <Loading />;
    if (!isAuthenticated) return <Navigate to='/auth' />;
    return children;
}
