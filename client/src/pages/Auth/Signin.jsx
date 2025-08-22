import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMail, IconEyeOff } from '@tabler/icons-react';

export default function SignIn({ changeForm, setAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShow] = useState(false);
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.ok) {
            setAuthenticated(true);
            navigate(data.redirect);
        } else alert(data.message);
    }

    function toSignup() {
        setEmail('');
        setPassword('');
        changeForm();
    }

    return (
        <form className='signin' onSubmit={submit}>
            <h2>SignIn</h2>
            <div className='input-label'>
                <label htmlFor='email'>Email</label>
                <div className='input-content'>
                    <input
                        type='email'
                        id='email'
                        placeholder='exemplo@email.com'
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor='email'>
                        <IconMail />
                    </label>
                </div>
            </div>
            <div className='input-label'>
                <label htmlFor='password'>Password</label>
                <div className='input-content'>
                    <input
                        type='password'
                        id='password'
                        placeholder='Your secret password'
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor='show-signin'>
                        <IconEyeOff id='show-signin' onClick={() => setShow(!showPassword)} />
                    </label>
                </div>
            </div>
            <button type='submit'>SignIn</button>
            <p>
                Don't have an account? <a onClick={toSignup}>To SignUp</a>
            </p>
        </form>
    );
}
