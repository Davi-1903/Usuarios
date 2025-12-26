import type { ReactNode } from 'react';

export interface ProtectedRouteProps {
    children: ReactNode;
    isPrivate: boolean;
}

export interface FormProps {
    changeForm: () => void;
}
