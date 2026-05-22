import type { ReactNode } from 'react';
import { AuthenticatedProvider } from './authContext';
import { MessagesProvider } from './messagesContext';

export default function WrapperProvider({ children }: { children: ReactNode }) {
    return (
        <AuthenticatedProvider>
            <MessagesProvider>{children}</MessagesProvider>
        </AuthenticatedProvider>
    );
}
