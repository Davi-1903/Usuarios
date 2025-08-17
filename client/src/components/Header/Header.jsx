import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    async function logoutUser() {
        const response = await fetch('/logout', {
            method: 'POST',
            credentials: 'include',
        });
        const data = await response.json();
        navigate(data.readirectTo);
    }

    async function checkUser() {
        const response = await fetch('/user', {
            credentials: 'include',
        });
        const data = await response.json();
        if (!data.ok) {
            throw new Error('Erro HTTP');
        }
        setAuthenticated(true);
    }

    useEffect(() => {
        checkUser();
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
