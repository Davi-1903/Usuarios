import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Welcome from './pages/Home/Welcome';
import Dash from './pages/Home/Dash';
import Auth from './Pages/Auth/Auth';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    async function logoutUser() {
        if (confirm('Você tem certeza?')) {
            const response = await fetch('/api/logout', {
                credentials: 'include',
            });
            const data = await response.json();
            setAuthenticated(false);
            navigate(data.redirect);
        }
    }

    const checkUser = useCallback(async () => {
        const response = await fetch('/api/check_auth', { credentials: 'include' });
        if (response.status === 200) {
            setAuthenticated(true);
            navigate('/dash');
        }
    }, [navigate]);

    useEffect(() => {
        checkUser();
    }, [checkUser]);

    return (
        <div className='wrapper'>
            <Header isAuthenticated={isAuthenticated} logoutUser={logoutUser} />
            <main>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/dash' element={<Dash />} />
                    <Route path='/auth' element={<Auth setAuthenticated={setAuthenticated} />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
