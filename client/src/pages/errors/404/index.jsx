import { Helmet } from 'react-helmet-async';
import { useAuthenticated } from '../../../context/AuthContext';

export default function Error404() {
    const { isAuthenticated } = useAuthenticated();

    return (
        <>
            <Helmet>
                <title>Usuários | 404</title>
            </Helmet>
            <main
                className={`grid place-items-center ${isAuthenticated ? 'row-span-2' : 'col-span-2'}`}
            >
                <h1 className='font-primary text-7xl font-bold text-black'>
                    404 | Not Found :&#40;
                </h1>
            </main>
        </>
    );
}
