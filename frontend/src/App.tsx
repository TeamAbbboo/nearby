/* components */
import MyPage from '@/pages/my/MyPage';
import LoginPage from '@/pages/login/LoginPage';
import KakaoLoginRedircetPage from '@/pages/login/KakaoLoginRedircetPage';
import SignupPage from '@/pages/signup/SignUpPage';
import RegisterPage from '@/pages/register/RegisterPage';
import SoloPage from '@/pages/familycode/SoloPage';
import GroupPage from '@/pages/familycode/GroupPage';
import HomePage from '@/pages/home/HomePage';
import GreenHousePage from '@/pages/greenhouse/GreenHousePage';
import AlbumPage from '@/pages/greenhouse/AlbumPage';
import RegisterStoryPage from '@/pages/story/RegisterStoryPage';
import SplashHomePage from '@/pages/splash/SplashHomePage';
import SplashPlaygroundPage from '@/pages/splash/SplashPlaygroundPage';
import SplashGreenhousePage from '@/pages/splash/SplashGreenhousePage';

import PrivateRoute from '@/pages/private/PrivateRoute ';

/* libraries */
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashHomePage />,
  },
  {
    path: '/my',
    element: (
      <PrivateRoute>
        <MyPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/login/redirect/kakao',
    element: <KakaoLoginRedircetPage />,
  },
  {
    path: '/signup',
    element: (
      <PrivateRoute>
        <SignupPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PrivateRoute>
        <RegisterPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/solo',
    element: (
      <PrivateRoute>
        <SoloPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/group',
    element: (
      <PrivateRoute>
        <GroupPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/splashMy',
    element: <SplashPlaygroundPage />,
  },
  {
    path: '/home',
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: '/splashGreenhouse',
    element: <SplashGreenhousePage />,
  },
  {
    path: '/greenhouse',
    element: (
      <PrivateRoute>
        <GreenHousePage />
      </PrivateRoute>
    ),
  },
  {
    path: '/album',
    element: (
      <PrivateRoute>
        <AlbumPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/story',
    element: (
      <PrivateRoute>
        <RegisterStoryPage />
      </PrivateRoute>
    ),
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
