import './services/axios';
import '../src/styles/home.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import GeneralLayout from './layout/GeneralLayout';
import PrivateLayout from './layout/PrivateLayout';
import PrivateRoutes from './routes/PrivateRoutes';
import Loading from './components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './pages/authentication/Auth';
import '../firebase';
import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { setNotificationUpdated } from './hooks/slices/notificationSlice';
import { messaging } from '../firebase';
import { toast } from 'react-toastify';

function App() {
  const { main } = useSelector((state) => state);
  const dispatch = useDispatch();

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

  onMessage(messaging, (payload) => {
    if (payload) {
      toast(payload.data?.body);
      dispatch(setNotificationUpdated(true));
    }
  });

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
