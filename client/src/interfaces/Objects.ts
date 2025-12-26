import type { Dispatch, SetStateAction } from 'react';

export interface Message {
    id: number;
    description: string;
    ok: boolean;
}

export interface MessagesContextType {
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
}

export interface AuthenticatedContextType {
    isAuthenticated: boolean;
    setAuthenticated: Dispatch<SetStateAction<boolean>>;
}
