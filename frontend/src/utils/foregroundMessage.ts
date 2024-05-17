import { getToken, getMessaging, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import Toast from '@/components/@common/Toast/Toast';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FCM_API_KEY,
  authDomain: 'nearby-1439d.firebaseapp.com',
  projectId: 'nearby-1439d',
  storageBucket: 'nearby-1439d.appspot.com',
  messagingSenderId: '1067829623938',
  appId: '1:1067829623938:web:496249741d1e8c5fecc89b',
  measurementId: 'G-9WX05FPJB4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onMessage(messaging, payload => {
  console.log('알림 도착 ', payload.data);
  Toast.success(payload.data?.title);

  const { body, title } = payload.data!;
  const notificationOptions = {
    body: body,
  };

  if (Notification.permission === 'granted') {
    new Notification(title, notificationOptions);
  }
});

async function requestPermission() {
  try {
    const permission = await Notification.requestPermission(); // 권한 설정
    const messaging = getMessaging(app);
    console.log(permission);
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
      });
      if (token) {
        console.log(token);
        // sendTokenToServer(token); // (토큰을 서버로 전송하는 로직)
      } else {
        Toast.error('토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요');
      }
    } else if (permission === 'denied') {
      Toast.error('web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요');
    }
  } catch (error) {
    console.error('푸시 토큰 가져오는 중에 에러 발생', error);
  }
}

const getFirebaseToken = async () => {
  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
  });

  return token;
};

export { requestPermission, getFirebaseToken };
