import { Link, useNavigate } from 'react-router-dom';
import { IconDashboard, IconLogout } from '@tabler/icons-react';
import { useAuthenticated } from '../../context/authContext';

export default function Sidebar() {
    const { setAuthenticated } = useAuthenticated();
    const navigate = useNavigate();

    async function logoutUser(e) {
        e.preventDefault();

        const confirmed = confirm('Você tem certeza?');
        if (!confirmed) return;

        const response = await fetch('/api/auth/logout', {
            credentials: 'include',
        });

        const data = await response.json();
        if (data.ok) {
            setAuthenticated(false);
            navigate(data.redirect);
        }
    }

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
                    <Link onClick={logoutUser}>
                        <button>
                            <IconLogout />
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
