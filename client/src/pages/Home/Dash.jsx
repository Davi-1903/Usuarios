import { useEffect, useState } from 'react';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';

export default function Dash() {
    const [name, setName] = useState(null);

    useEffect(() => {
        fetch('/api/user', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setName(data.name));
    }, []);

    return (
        <PrivateRoute>
            <div className='text-container'>
                <h1>Welcome, {name}</h1>
            </div>
        </PrivateRoute>
    );
}
