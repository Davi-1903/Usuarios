import { useState } from 'react';
import SignIn from './Signin';
import SignUp from './Signup';
import './Auth.css';

export default function Auth({ setAuthenticated }) {
    const [invert, setInvert] = useState(false);

    function changeForm() {
        setInvert(!invert);
    }

    return (
        <div className='form-content'>
            <div className={`form-container ${invert ? 'invert' : ''}`}>
                <SignUp changeForm={changeForm} setAuthenticated={setAuthenticated} />
                <SignIn changeForm={changeForm} setAuthenticated={setAuthenticated} />
            </div>
        </div>
    );
}
