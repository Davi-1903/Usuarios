import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticated } from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function App() {
    const { setAuthenticated } = useAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/auth/check', { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    setAuthenticated(true);
                    navigate('/dash');
                }
            })
            .catch(err => console.error(err));
    }, [navigate, setAuthenticated]);

    return (
        <div className='wrapper'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
