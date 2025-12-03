import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import WrapperProvider from './context/WrappeProvider.jsx';

import Layout from './Layout.jsx';
import Welcome from './pages/unprotected/home/welcome.jsx';
import Dash from './pages/protected/home/dash.jsx';
import Auth from './pages/unprotected/auth';
import Error404 from './pages/Errors/404';

import './index.css';

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
