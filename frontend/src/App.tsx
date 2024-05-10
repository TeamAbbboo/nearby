/* components */
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import KakaoLoginRedircetPage from '@/pages/login/KakaoLoginRedircetPage';
import SignupPage from '@/pages/signup/SignUpPage';
import RegisterPage from '@/pages/register/RegisterPage';
import SoloPage from '@/pages/familycode/SoloPage';
import GroupPage from '@/pages/familycode/GroupPage';
import PlaygroundPage from '@/pages/playground/PlaygroundPage';
import GreenHousePage from '@/pages/greenhouse/GreenHousePage';
import AlbumPage from '@/pages/greenhouse/AlbumPage';
import RegisterStoryPage from '@/pages/story/RegisterStoryPage';
import SplashPage from '@/pages/splash/SplashPage';
import PrivateRoute from '@/pages/private/PrivateRoute ';

/* libraries */
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashPage />,
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
    path: '/playground',
    element: (
      <PrivateRoute>
        <PlaygroundPage />
      </PrivateRoute>
    ),
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
