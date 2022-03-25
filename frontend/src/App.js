import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const App = () => {
    return (
        <BrowserRouter>
            <div className='container'>
                <Header />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<Dashboard />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};
