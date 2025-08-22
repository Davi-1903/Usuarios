import { Link } from 'react-router-dom';
import './Home.css';

export default function Welcome() {
    return (
        <div className='text-container'>
            <h1>Welcome!</h1>
            <Link to='/auth'>
                <button>Login</button>
            </Link>
        </div>
    );
}
