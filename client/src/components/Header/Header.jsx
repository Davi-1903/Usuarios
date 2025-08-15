import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    function logoutUser() {
        fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => navigate(data.readirectTo));
    }

    useEffect(() => {
        fetch('/api/user', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Erro HTTP ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (!data.ok) {
                    throw new Error(`Erro HTTP`);
                }
                setAuthenticated(true);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <header>
            {/* Logo Ilustrativa */}
            <div className='logo'></div>
            <nav>
                <ul className='menu'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {!authenticated ? (
                        <li>
                            <Link to='/auth'>Auth</Link>
                        </li>
                    ) : (
                        <li>
                            <Link onClick={logoutUser}>Logout</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
