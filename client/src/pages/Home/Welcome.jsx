import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Welcome() {
    return (
        <>
            <Helmet>
                <title>Usuários | Welcome</title>
                <meta
                    name='description'
                    content='Página inicial do sistema de cadastro de usuários'
                />
            </Helmet>
            <main className='flex flex-col items-center justify-center gap-8'>
                <h1 className='font-primary text-7xl font-bold text-black'>Welcome!</h1>
                <Link to='/auth'>
                    <button className='font-secundary cursor-pointer bg-black px-8 py-2 text-2xl text-white'>
                        Login
                    </button>
                </Link>
            </main>
        </>
    );
}
