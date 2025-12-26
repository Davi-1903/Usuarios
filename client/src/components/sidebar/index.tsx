import { Link, useNavigate } from 'react-router-dom';
import { IconDashboard, IconLogout } from '@tabler/icons-react';
import { useAuthenticated } from '../../context/authContext';
import getCSRF from '../../api/csrf';
import type { MouseEvent } from 'react';

export default function Sidebar() {
    const { setAuthenticated } = useAuthenticated();
    const navigate = useNavigate();

    async function handleLogout(e: MouseEvent<HTMLButtonElement>): Promise<void> {
        e.preventDefault();
        const csrf = await getCSRF();

        const confirmed = confirm('Você tem certeza?');
        if (!confirmed) return;

        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: { 'X-CSRFToken': csrf },
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
                    <button onClick={handleLogout}>
                        <IconLogout />
                    </button>
                </li>
            </ul>
        </nav>
    );
}
