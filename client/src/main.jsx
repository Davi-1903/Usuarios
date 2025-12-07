import { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import WrapperProvider from './context/WrappeProvider.jsx';

import Layout from './Layout.jsx';
const Welcome = lazy(() => import('./pages/unprotected/home/welcome.jsx'));
const Dash = lazy(() => import('./pages/protected/home/dash.jsx'));
const Auth = lazy(() => import('./pages/unprotected/auth'));
const Error404 = lazy(() => import('./pages/errors/404'));

import './globals.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Welcome /> },
            { path: 'dash', element: <Dash /> },
            { path: 'auth', element: <Auth /> },
            { path: '*', element: <Error404 /> },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <HelmetProvider>
        <WrapperProvider>
            <RouterProvider router={router} />
        </WrapperProvider>
    </HelmetProvider>,
);
