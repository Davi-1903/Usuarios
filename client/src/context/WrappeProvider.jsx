import { AuthenticatedProvider } from './authContext';
import { MessagesProvider } from './MessagesContext';

export default function WrapperProvider({ children }) {
    return (
        <AuthenticatedProvider>
            <MessagesProvider>{children}</MessagesProvider>
        </AuthenticatedProvider>
    );
}
