import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TypeRoute from '../../../components/typeRoute/typeRoute';

export default function Dash() {
    const [name, setName] = useState(null);

    useEffect(() => {
        fetch('/api/user', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setName(data.name));
    }, []);

    return (
        <TypeRoute isPrivate={true}>
            <Helmet>
                <title>Usuários | Dash</title>
                <meta name='description' content='Home do sistema de cadastro de usuários' />
            </Helmet>
            <main className='row-span-2 grid place-items-center'>
                <h1 className='font-primary text-3xl font-bold text-black lg:text-7xl'>
                    Welcome, {name}
                </h1>
            </main>
        </TypeRoute>
    );
}
