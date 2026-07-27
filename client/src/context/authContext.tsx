import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthenticatedContextType } from '../interfaces/Objects';
import { setAccessToken, tryRefresh } from '../api/users';

const AuthenticatedContext = createContext<AuthenticatedContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export function AuthenticatedProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState(false);

    const login = (token: string) => {
        setAccessToken(token);
        setAuthenticated(true);
    };

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        setAccessToken(null);
        setAuthenticated(false);
    };

    useEffect(() => {
        tryRefresh().then(token => setAuthenticated(Boolean(token)));
    }, []);

    return (
        <AuthenticatedContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthenticatedContext.Provider>
    );
}

export function useAuthenticated() {
    return useContext(AuthenticatedContext);
}
