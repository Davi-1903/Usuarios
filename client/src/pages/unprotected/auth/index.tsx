import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SignIn from './components/signin';
import SignUp from './components/signup';
import ProtectedRoute from '../../../components/protectedRoute';

export default function Auth() {
    const [invert, setInvert] = useState(false);

    function changeForm(): void {
        setInvert(!invert);
    }

    return (
        <ProtectedRoute isPrivate={false}>
            <Helmet>
                <title>Usuários | Auth</title>
                <meta
                    name='description'
                    content='Página para cadastro e autenticação do sistema de cadastro de usuários'
                />
            </Helmet>
            <>
                <div
                    className={`relative h-full w-sm transition duration-500 ease-in-out transform-3d ${invert ? 'rotate-y-180' : ''}`}
                >
                    <SignUp changeForm={changeForm} />
                    <SignIn changeForm={changeForm} />
                </div>
            </>
        </ProtectedRoute>
    );
}
