import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ isAuthenticated, logoutUser }) {
    return (
        <header>
            {/* Logo Ilustrativa */}
            <div className='logo'></div>
            <nav>
                <ul className='menu'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {!isAuthenticated ? (
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
