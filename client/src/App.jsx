import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticated } from './context/AuthContext';
import { useMessages } from './context/MessagesContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Message from './components/Messages/Message';

export default function App() {
    const { setAuthenticated } = useAuthenticated();
    const { setMessages } = useMessages();
    const { messages } = useMessages();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/auth/check', { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    setAuthenticated(true);
                    navigate('/dash');
                }
            })
            .catch(err => {
                setMessages(prev => [
                    ...prev,
                    { id: prev.length + 1, title: 'Error', ok: false, description: err.message },
                ]);
                console.error(err);
            });
    }, [navigate, setAuthenticated, setMessages]);

    return (
        <div className='wrapper'>
            <article className='pointer-events-none fixed top-4 right-4 flex w-sm flex-col gap-4'>
                {messages.map(message => {
                    return <Message key={message.id} {...message} />;
                })}
            </article>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
