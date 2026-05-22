import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AuthenticatedContextType } from '../interfaces/Objects';

const AuthenticatedContext = createContext<AuthenticatedContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export function AuthenticatedProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState(false);

    const login = (token: string) => {
        localStorage.setItem('accessToken', token);
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setAuthenticated(false);
    };

    return (
        <AuthenticatedContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthenticatedContext.Provider>
    );
}

export function useAuthenticated() {
    return useContext(AuthenticatedContext);
}
