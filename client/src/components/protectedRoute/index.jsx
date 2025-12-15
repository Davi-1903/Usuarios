import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/AuthContext';
import Loading from '../loading';

export default function ProtectedRoute({ children, isPrivate }) {
    const [isOk, setOk] = useState(null);
    const { setAuthenticated } = useAuthenticated();

    useEffect(() => {
        fetch('/api/auth/check', { credentials: 'include' })
            .then(res => {
                const result = res.status === 200;
                setOk(result);
                setAuthenticated(result);
            })
            .catch(err => {
                setOk(false);
                setAuthenticated(false);
                console.error(err);
            });
    }, [setAuthenticated]);

    if (isOk === null) return <Loading />;
    if (isPrivate && !isOk) return <Navigate to='/auth' />;
    if (!isPrivate && isOk) return <Navigate to='/dash' />;
    return children;
}
