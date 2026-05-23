import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ProtectedRoute from '../../../components/protectedRoute';
import { GET } from '../../../api/users';

export default function Dash() {
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        GET<{ name: string }>('/api/user/').then(data => {
            if (data.status === 200) {
                setName(data.name);
            } else {
                console.error('Erro ao carregar usuário:', data);
            }
        });
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
