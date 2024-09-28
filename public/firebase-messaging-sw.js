importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDWwSKm_7ioL3xuhUYm23J8807u1sH-J1U',
  authDomain: 'task-manager-a6351.firebaseapp.com',
  projectId: 'task-manager-a6351',
  storageBucket: 'task-manager-a6351.appspot.com',
  messagingSenderId: '801525673870',
  appId: '1:801525673870:web:46fc622904f3d14fd2fedf',
  measurementId: 'G-NXBH67QTLR'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.image
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
  new Notification(payload.data?.title, {
    body: payload.data.body,
    icon: payload.data.icon
  });
});
