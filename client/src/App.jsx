import { useEffect, useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuthenticated } from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
    const { setAuthenticated } = useAuthenticated();
    const navigate = useNavigate();

    const checkUser = useCallback(async () => {
        const response = await fetch('/api/auth/check', { credentials: 'include' });
        if (response.status === 200) {
            setAuthenticated(true);
            navigate('/dash');
        }
    }, [navigate, setAuthenticated]);

    useEffect(() => {
        checkUser();
    }, [checkUser]);

    return (
        <div className='wrapper'>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
