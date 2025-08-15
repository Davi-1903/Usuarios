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
                if (!data) {
                    throw new Error('Erro HTTP');
                }
                setName(data.name);
            })
            .catch(err => console.error('Erro na requisição:' + err));
    }, []);

    return <>{name ? <UserLogin name={name} /> : <UserLogout />}</>;
}
