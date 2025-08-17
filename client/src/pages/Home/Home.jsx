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
            <h1>Welcome back, {name}</h1>
        </div>
    );
}

export default function Home() {
    const [name, setName] = useState(null);

    async function getNAme() {
        const response = await fetch('/user');
        const data = await response.json();
        if (!data.ok) {
            throw new Error('Erro HTTP');
        }
        setName(data.name);
    }

    useEffect(() => {
        getNAme()
    }, []);

    return <>{name ? <UserLogin name={name} /> : <UserLogout />}</>;
}
