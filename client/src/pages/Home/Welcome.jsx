import { Link } from 'react-router-dom';

export default function Welcome() {
    return (
        <main className='flex flex-col items-center justify-center gap-8'>
            <h1 className='font-primary text-7xl font-bold text-black'>Welcome!</h1>
            <Link to='/auth'>
                <button className='font-secundary cursor-pointer bg-black px-8 py-2 text-2xl text-white'>
                    Login
                </button>
            </Link>
        </main>
    );
}
