import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthenticatedContextType } from '../interfaces/Objects';
import { GET } from '../api/users';

const AuthenticatedContext = createContext<AuthenticatedContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export function AuthenticatedProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState(() => Boolean(localStorage.getItem('access_token')));

    const login = (token: string, refreshToken: string) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setAuthenticated(false);
    };

    useEffect(() => {
        const checkAuth = () => {
            if (!localStorage.getItem('access_token')) {
                setAuthenticated(false);
                return;
            }

            GET('/api/user/')
                .then(res => setAuthenticated(res.status === 200))
                .catch(() => setAuthenticated(false));
        };

        checkAuth();
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
