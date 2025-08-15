import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <header>
            {/* Logo Ilustrativa */}
            <div className='logo'></div>
            <nav>
                <ul className='menu'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/auth'>Auth</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
