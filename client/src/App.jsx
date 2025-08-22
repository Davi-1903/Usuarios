import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Auth from './Pages/Auth/Auth';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    async function logoutUser() {
        const response = await fetch('/api/logout', {
            credentials: 'include',
        });
        const data = await response.json();
        setAuthenticated(false);
        navigate(data.readirectTo);
    }

    async function checkUser() {
        const response = await fetch('/api/session', {
            credentials: 'include',
        });
        setAuthenticated(response.status === 200);
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <div className='wrapper'>
            <Header isAuthenticated={isAuthenticated} logoutUser={logoutUser} />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/auth' element={<Auth setAuthenticated={setAuthenticated} />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
