import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar';

export default function ProtectedLayout() {
    return (
        <>
            <Sidebar />
            <main className='row-span-2 grid place-items-center'>
                <Outlet />
            </main>
        </>
    );
}
