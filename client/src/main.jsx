import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthenticatedProvider } from './context/AuthContext.jsx';

import App from './App.jsx';
import Welcome from './pages/Home/Welcome.jsx';
import Dash from './pages/Home/Dash.jsx';
import Auth from './Pages/Auth/Auth.jsx';
import Error404 from './pages/Errors/Error404.jsx';

import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Welcome /> },
            { path: '/dash', element: <Dash /> },
            { path: '/auth', element: <Auth /> },
            { path: '*', element: <Error404 /> },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthenticatedProvider>
            <RouterProvider router={router} />
        </AuthenticatedProvider>
    </StrictMode>
);
