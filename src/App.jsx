import './services/axios';
import '../src/styles/home.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import GeneralLayout from './layout/GeneralLayout';
import PrivateLayout from './layout/PrivateLayout';
import PrivateRoutes from './routes/PrivateRoutes';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';
import Auth from './pages/authentication/Auth';
import '../firebase';
import { useEffect } from 'react';

function App() {
  const { main } = useSelector((state) => state);

  useEffect(() => {
    if (navigator) {
      navigator.permissions
        .query({ name: 'notifications' })
        .then(() => {})
        .catch(() => {
          Notification.requestPermission();
        })
        .finally(() => {
          Notification.requestPermission();
        });
    }
  }, []);

  return (
    <>
      <Loading isLoading={main?.showLoading?.value ? true : false} />
      <Router>
        <Routes>
          <Route
            path="/users/*"
            element={
              <PrivateLayout>
                <PrivateRoutes />
              </PrivateLayout>
            }
          />
          {/* <Route path="/*" element={<GeneralLayout />} /> */}
          <Route path="/" element={<Navigate to={'/login'} replace />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
