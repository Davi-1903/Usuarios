import { Outlet } from 'react-router-dom';
import Header from '../../components/header';

export default function UnprotectedLayout() {
    return (
        <>
            <Header />
            <main className='col-span-2 flex flex-col items-center justify-center gap-8 perspective-distant'>
                <Outlet />
            </main>
        </>
    );
}
