import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthenticatedContextType } from '../interfaces/Objects';
import Loading from '../components/loading';

const AuthenticatedContext = createContext<AuthenticatedContextType>({
    isAuthenticated: false,
    setAuthenticated: () => {},
});

export function AuthenticatedProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/auth/check', { credentials: 'include' })
            .then(res => setAuthenticated(res.status === 200))
            .catch(() => setAuthenticated(false))
            .finally(() => setLoading(false));
    });

    if (isLoading) return <Loading />;
    return (
        <AuthenticatedContext.Provider value={{ isAuthenticated, setAuthenticated }}>
            {children}
        </AuthenticatedContext.Provider>
    );
}

export function useAuthenticated() {
    return useContext(AuthenticatedContext);
}
