import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function UserLogout() {
    return (
        <div className='text-container'>
            <h1>Welcome!</h1>
            <button>
                <Link to='/auth'>Login</Link>
            </button>
        </div>
    );
}

function UserLogin() {
    // const [name, setName] = useState('');

    return (
        <div className='text-container'>
            <h1>Welcome back, {name}</h1>
        </div>
    );
}

export default function Home() {
    const [user, setUser] = useState(null);

    return <>{user ? <UserLogin /> : <UserLogout />}</>;
}
