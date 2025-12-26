import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Message, MessagesContextType } from '../interfaces/Objects';

const MessagesContext = createContext<MessagesContextType>({
    messages: [],
    setMessages: () => {},
});

export function MessagesProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([]);

    return (
        <MessagesContext.Provider value={{ messages, setMessages }}>
            {children}
        </MessagesContext.Provider>
    );
}

export function useMessages() {
    return useContext(MessagesContext);
}
