import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMail, IconEyeOff } from '@tabler/icons-react';
import { useAuthenticated } from '../../../context/authContext';
import { useMessages } from '../../../context/messagesContext';

export default function SignIn({ changeForm }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShow] = useState(false);
    const { setAuthenticated } = useAuthenticated();
    const { setMessages } = useMessages();
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        const data = await response.json();
        if (data.ok) {
            setAuthenticated(true);
            navigate(data.redirect);
        } else {
            setMessages(prev => [
                ...prev,
                { id: prev.length + 1, title: 'Error', ok: false, description: data.message },
            ]);
        }
    }

    function toSignup() {
        setForm({ email: '', password: '' });
        changeForm();
    }

    return (
        <form className='form' onSubmit={submit}>
            <h2 className='font-primary text-5xl font-bold text-black'>SignIn</h2>
            <div>
                <label htmlFor='email-signin' className='font-secundary block text-lg text-black'>
                    Email
                </label>
                <div className='relative'>
                    <input
                        type='email'
                        id='email-signin'
                        placeholder='exemplo@email.com'
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className='font-secundary h-12 w-full bg-white pr-[15%] pl-4 text-lg text-black outline-0'
                    />
                    <label
                        htmlFor='email-signin'
                        className='absolute top-[calc(3rem*0.1)] right-[calc(3rem*0.1)] grid aspect-square h-8/10 cursor-pointer place-items-center'
                    >
                        <IconMail className='h-8 w-8 stroke-black' />
                    </label>
                </div>
            </div>
            <div>
                <label
                    htmlFor='password-signin'
                    className='font-secundary block text-lg text-black'
                >
                    Password
                </label>
                <div className='relative'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password-signin'
                        placeholder='Your secret password'
                        required
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        className='font-secundary h-12 w-full bg-white pr-[15%] pl-4 text-lg text-black outline-0'
                    />
                    <label
                        htmlFor='show-signin'
                        className='absolute top-[calc(3rem*0.1)] right-[calc(3rem*0.1)] grid aspect-square h-8/10 cursor-pointer place-items-center'
                    >
                        <IconEyeOff
                            id='show-signin'
                            onClick={() => setShow(!showPassword)}
                            className='h-8 w-8 stroke-black'
                        />
                    </label>
                </div>
            </div>
            <button
                type='submit'
                className='font-primary h-12 w-full cursor-pointer bg-black text-xl text-white'
            >
                SignIn
            </button>
            <p className='text-2sm font-secundary text-black'>
                Don't have an account?{' '}
                <span onClick={toSignup} className='cursor-pointer text-black hover:underline'>
                    To SignUp
                </span>
            </p>
        </form>
    );
}
