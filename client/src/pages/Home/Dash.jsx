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
            <main className='grid place-items-center'>
                <h1 className='font-primary text-7xl font-bold text-black'>Welcome, {name}</h1>
            </main>
        </PrivateRoute>
    );
}
