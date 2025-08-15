import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Auth from './Pages/Auth/Auth';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
    return (
        <div className='wrapper'>
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/auth' element={<Auth />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
