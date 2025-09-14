import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconUser, IconMail, IconEyeOff } from '@tabler/icons-react';
import { useAuthenticated } from '../../context/AuthContext';

export default function SignUp({ changeForm }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [showPassword, setShow] = useState(false);
    const { setAuthenticated } = useAuthenticated();
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        const data = await response.json();
        if (data.ok) {
            setAuthenticated(true);
            navigate(data.redirect);
        } else alert(data.message);
    }

    function toSignin() {
        setForm({
            name: '',
            email: '',
            password: '',
        });
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
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
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
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
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
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
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
