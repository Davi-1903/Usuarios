import { useState } from 'react';
import SignIn from './Signin';
import SignUp from './Signup';
import './Auth.css';

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
