import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SignIn from './Signin';
import SignUp from './Signup';
import TypeRoute from '../../../components/typeRoute/typeRoute';

export default function Auth() {
    const [invert, setInvert] = useState(false);

    function changeForm() {
        setInvert(!invert);
    }

    return (
        <TypeRoute isPrivate={false}>
            <Helmet>
                <title>Usuários | Auth</title>
                <meta
                    name='description'
                    content='Página para cadastro e autenticação do sistema de cadastro de usuários'
                />
            </Helmet>
            <main className='col-span-2 grid place-items-center perspective-distant'>
                <div
                    className={`relative h-full w-sm transition duration-500 ease-in-out transform-3d ${invert ? 'rotate-y-180' : ''}`}
                >
                    <SignUp changeForm={changeForm} />
                    <SignIn changeForm={changeForm} />
                </div>
            </main>
        </TypeRoute>
    );
}
