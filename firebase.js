import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import axios from 'axios';

const baseURL = import.meta.env.VITE_URL;

const firebaseConfig = {
  apiKey: 'AIzaSyDWwSKm_7ioL3xuhUYm23J8807u1sH-J1U',
  authDomain: 'task-manager-a6351.firebaseapp.com',
  projectId: 'task-manager-a6351',
  storageBucket: 'task-manager-a6351.appspot.com',
  messagingSenderId: '801525673870',
  appId: '1:801525673870:web:46fc622904f3d14fd2fedf',
  measurementId: 'G-NXBH67QTLR'
};

const detectDeviceType = () => {
  if (window.matchMedia('(max-width: 768px)').matches) {
    return 'Mobile';
  } else {
    return 'Desktop';
  }
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  await navigator.serviceWorker
    .register('/public/firebase-messaging-sw.js', { type: 'module' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  const token = localStorage.getItem('tokenId');

  navigator.permissions.query({ name: 'notifications' }).then(async (pr) => {
    if (pr.state === 'granted' && token) {
      const fcmToken = await getToken(messaging, {
        vapidKey:
          'BMkpeCZ0vj98tbVxyyuv-MuYELSeNVbTro8SQVURzw7upmPa7D0igAZkciuFfMWWR35f5e5gt4Vn3MAwuh1S6JQ'
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          // console.log(`در گرفتن توکن مشکل بوجود امد: ${err}`);
          return err;
        });

      if (fcmToken) {
        await axios
          .post(
            'api/Account/UserBrowserEndPoint',
            {
              endpoint: fcmToken
              // deviceType: detectDeviceType()
            },
            {
              baseURL: baseURL,
              headers: token
                ? {
                    Authorization: `Bearer ${token}`,
                    'X-Requested-With': 'XMLHttpRequest'
                  }
                : {}
            }
          )
          .then((res) => {
            if (res.status === 200) {
              // console.log(`endpoint با موفقیت ارسال شد`);
              // console.log(`نتیجه بک اند : ${res.data?.msg}`);
            }
          })
          .catch((err) => {
            // console.log(`endpoint فرستاده نشد`);
            // console.log(`نتیجه بک اند : ${err}`);
          });
        // console.log(`توکن فایربیس : ${fcmToken}`);
      }
    }
  });
};
generateToken();
