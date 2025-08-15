import { IconMail, IconEyeOff, IconUser } from '@tabler/icons-react';
import { useState } from 'react';
import './Auth.css';

function SignIn({ changeForm }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShow] = useState(false);

    function submit() {
        // code
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
                        type={showPassword ? 'text' : 'password'}
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
                Don't have an account? <a onClick={changeForm}>To SignUp</a>
            </p>
        </form>
    );
}

function SignUp({ changeForm }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShow] = useState(false);

    function submit() {
        // code
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
                Already have an account? <a onClick={changeForm}>To SignIn</a>
            </p>
        </form>
    );
}

export default function Auth() {
    const [invert, setInvert] = useState(false);

    function changeForm() {
        setInvert(!invert);
    }

    return (
        <div className='form-content'>
            <div className={`form-container ${invert ? 'invert' : ''}`}>
                <SignUp changeForm={changeForm} />
                <SignIn changeForm={changeForm} />
            </div>
        </div>
    );
}
