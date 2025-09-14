import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticatedProvider } from './context/AuthContext.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthenticatedProvider>
            <App />
        </AuthenticatedProvider>
    </BrowserRouter>
);
