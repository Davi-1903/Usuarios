import { Link } from 'react-router-dom';
import { IconDashboard, IconLogout } from '@tabler/icons-react';
import { useAuthenticated } from '../../context/authContext';

export default function Sidebar() {
    const { logout } = useAuthenticated();

    return (
        <nav className='bg-header shadow-basic row-span-2 flex flex-col gap-8 p-4'>
            <div className='aspect-square w-full rounded-full bg-black'></div>
            <ul className='flex flex-col gap-4'>
                <li className='link'>
                    <Link to='/dash'>
                        <button>
                            <IconDashboard />
                        </button>
                    </Link>
                </li>
                <li className='link'>
                    <button onClick={logout}>
                        <IconLogout />
                    </button>
                </li>
            </ul>
        </nav>
    );
}
