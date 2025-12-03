import { Link, useNavigate } from 'react-router-dom';
import { IconDashboard, IconHome, IconLogin, IconLogout } from '@tabler/icons-react';
import { useAuthenticated } from '../../context/AuthContext';

export default function Header() {
    const { isAuthenticated, setAuthenticated } = useAuthenticated();
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
        <header className='bg-header shadow-basic flex items-center justify-between px-8'>
            {/* Logo Ilustrativa */}
            <div className='aspect-square h-[60%] rounded-full bg-black'></div>
            <nav>
                <ul className='flex gap-8'>
                    {isAuthenticated ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <li className='link'>
                                <Link to='/'>
                                    <button>
                                        <IconHome />
                                    </button>
                                </Link>
                            </li>
                            <li className='link'>
                                <Link to='/auth'>
                                    <button>
                                        <IconLogin />
                                    </button>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
