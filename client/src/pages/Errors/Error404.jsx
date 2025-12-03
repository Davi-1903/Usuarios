import { Helmet } from 'react-helmet-async';

export default function Error404() {
    return (
        <>
            <Helmet>
                <title>Usuários | 404</title>
            </Helmet>
            <main className='grid place-items-center'>
                <h1 className='font-primary text-7xl font-bold text-black'>
                    404 | Not Found :&#40;
                </h1>
            </main>
        </>
    );
}
