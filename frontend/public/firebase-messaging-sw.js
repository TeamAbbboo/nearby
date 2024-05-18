/* eslint-disable */
/* tslint:disable */

importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {});

const firebaseConfig = {
  apiKey: 'AIzaSyBDc7Gj5CBAy2sDZ3ZS_ghDUdoI-uBvwbY',
  authDomain: 'nearby-1439d.firebaseapp.com',
  projectId: 'nearby-1439d',
  storageBucket: 'nearby-1439d.appspot.com',
  messagingSenderId: '1067829623938',
  appId: '1:1067829623938:web:496249741d1e8c5fecc89b',
  measurementId: 'G-9WX05FPJB4',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  // 백그라운드 메세지 핸들러
  console.log('payload : ', payload.data);
  const { body, title } = payload.data;
  const notificationOptions = {
    body: body, // 매세지 내용
    icon: '/src/assets/favicon.ico', // 로고 이미지 들어가는곳
    data: payload.data,
  };

  self.registration.showNotification(title, notificationOptions);
});

// 알림 클릭시
self.addEventListener('notificationclick', function (event) {
  const url = '/';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
