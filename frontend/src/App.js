import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const App = () => {
    return (
        <>
            <ToastContainer
                position='top-left'
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                draggable
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            <BrowserRouter>
                <div className='container'>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
};
