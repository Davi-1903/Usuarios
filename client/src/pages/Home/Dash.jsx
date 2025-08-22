import { useEffect, useState } from 'react';

export default function Dash() {
    const [name, setName] = useState(null);

    useEffect(() => {
        fetch('/api/session', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setName(data.name));
    }, []);

    return (
        <div className='text-container'>
            <h1>Welcome, {name}</h1>
        </div>
    );
}
