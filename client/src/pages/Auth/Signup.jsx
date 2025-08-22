import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconUser, IconMail, IconEyeOff } from '@tabler/icons-react';

export default function SignUp({ changeForm }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShow] = useState(false);
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (data.ok) navigate(data.redirectTo);
        else alert(data.message);
    }

    function toSignin() {
        setName('');
        setEmail('');
        setPassword('');
        changeForm();
    }

    return (
        <form className='signup' onSubmit={submit}>
            <h2>SignUp</h2>
            <div className='input-label'>
                <label htmlFor='name'>Name</label>
                <div className='input-content'>
                    <input
                        type='text'
                        id='name'
                        placeholder="What's your name?"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <label htmlFor='name'>
                        <IconUser />
                    </label>
                </div>
            </div>
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
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        placeholder='Your secret password'
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label htmlFor='show-singup'>
                        <IconEyeOff id='show-singup' onClick={() => setShow(!showPassword)} />
                    </label>
                </div>
            </div>
            <button type='submit'>SignUp</button>
            <p>
                Already have an account? <a onClick={toSignin}>To SignIn</a>
            </p>
        </form>
    );
}
