import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
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
            <Helmet>
                <title>Usuários | Dash</title>
                <meta name='description' content='Home do sistema de cadastro de usuários' />
            </Helmet>
            <main className='grid place-items-center'>
                <h1 className='font-primary text-7xl font-bold text-black'>Welcome, {name}</h1>
            </main>
        </PrivateRoute>
    );
}
