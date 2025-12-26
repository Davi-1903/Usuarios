import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ProtectedRoute from '../../../components/protectedRoute';

export default function Dash() {
    const [name, setName] = useState(null);

    useEffect(() => {
        fetch('/api/user', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setName(data.name));
    }, []);

    return (
        <ProtectedRoute isPrivate={true}>
            <Helmet>
                <title>Usuários | Dash</title>
                <meta name='description' content='Home do sistema de cadastro de usuários' />
            </Helmet>
            <>
                <h1 className='font-primary text-3xl font-bold text-black lg:text-7xl'>
                    Welcome, {name}
                </h1>
            </>
        </ProtectedRoute>
    );
}
