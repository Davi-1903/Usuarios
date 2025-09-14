import { useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Welcome from './pages/Home/Welcome';
import Dash from './pages/Home/Dash';
import Auth from './Pages/Auth/Auth';
import Footer from './components/Footer/Footer';
import { useAuthenticated } from './context/AuthContext';
import './App.css';

export default function App() {
    const { setAuthenticated } = useAuthenticated();
    const navigate = useNavigate();

    const checkUser = useCallback(async () => {
        const response = await fetch('/api/check_auth', { credentials: 'include' });
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
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/dash' element={<Dash />} />
                    <Route path='/auth' element={<Auth />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
