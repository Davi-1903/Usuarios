import { useMessages } from './context/MessagesContext';
import { useAuthenticated } from './context/AuthContext';
import Footer from './components/Footer/Footer';
import Message from './components/Messages/Message';
import ProtectedLayout from './pages/protected/Layout';
import UnprotectedLayout from './pages/unprotected/Layout';

export default function App() {
    const { isAuthenticated } = useAuthenticated();
    const { messages } = useMessages();

    return (
        <div className='wrapper'>
            <article className='pointer-events-none fixed top-4 right-4 z-1 flex w-sm flex-col gap-4'>
                {messages.map(message => {
                    return <Message key={message.id} {...message} />;
                })}
            </article>
            {isAuthenticated ? <ProtectedLayout /> : <UnprotectedLayout />}
            <Footer />
        </div>
    );
}
