/* eslint-disable */
/* tslint:disable */

importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

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

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..');
});

// 알림 왔을 때
self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;

  const notificationOptions = {
    body: resultData.body,
  };

  console.log(resultData.title, {
    body: resultData.body,
  });

  e.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
});

// 알림 클릭시
self.addEventListener('notificationclick', function (event) {
  const url = '/';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
