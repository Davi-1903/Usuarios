import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function UserLogout() {
    return (
        <div className='text-container'>
            <h1>Welcome!</h1>
            <Link to='/auth'>
                <button>Login</button>
            </Link>
        </div>
    );
}

function UserLogin({ name }) {
    return (
        <div className='text-container'>
            <h1>Welcome, {name}</h1>
        </div>
    );
}

export default function Home() {
    const [name, setName] = useState(null);

    async function getName() {
        const response = await fetch('/api/user', {
            credentials: 'include',
        });
        const data = await response.json();
        if (data.ok) setName(data.name);
    }

    useEffect(() => {
        getName();
    }, []);

    return <>{name ? <UserLogin name={name} /> : <UserLogout />}</>;
}
