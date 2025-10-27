import { Link, useNavigate } from 'react-router-dom';
import { useAuthenticated } from '../../context/AuthContext';
import './Header.css';

export default function Header() {
    const { isAuthenticated, setAuthenticated } = useAuthenticated();
    const navigate = useNavigate();

    async function logoutUser(e) {
        e.preventDefault()

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
        <header>
            {/* Logo Ilustrativa */}
            <div className='logo'></div>
            <nav>
                <ul className='menu'>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to='/dash'>Dash</Link>
                            </li>
                            <li>
                                <Link onClick={logoutUser}>Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/auth'>Auth</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
