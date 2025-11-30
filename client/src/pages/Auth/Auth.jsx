import { useState } from 'react';
import SignIn from './Signin';
import SignUp from './Signup';

export default function Auth() {
    const [invert, setInvert] = useState(false);

    function changeForm() {
        setInvert(!invert);
    }

    return (
        <main className='grid place-items-center perspective-distant'>
            <div
                className={`relative h-full w-sm transition duration-500 ease-in-out transform-3d ${invert ? 'rotate-y-180' : ''}`}
            >
                <SignUp changeForm={changeForm} />
                <SignIn changeForm={changeForm} />
            </div>
        </main>
    );
}
