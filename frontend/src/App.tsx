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
import SplashMyPage from '@/pages/splash/SplashMyPage';
import SplashGreenhousePage from '@/pages/splash/SplashGreenhousePage';
import PreventRoute from '@/pages/private/PreventRoute';
import PrivateRoute from '@/pages/private/PrivateRoute ';
import ViewStoryPage from '@/pages/story/ViewStoryPage';

/* libraries */
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './pages/error/ErrorPage';
import TutorialPage from './pages/tutorial/TutorialPage';

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
    element: (
      <PrivateRoute>
        <SplashMyPage />
      </PrivateRoute>
    ),
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
    element: (
      <PreventRoute>
        <PrivateRoute>
          <SplashGreenhousePage />
        </PrivateRoute>
      </PreventRoute>
    ),
  },
  {
    path: '/greenhouse',
    element: (
      <PreventRoute>
        <PrivateRoute>
          <GreenHousePage />
        </PrivateRoute>
      </PreventRoute>
    ),
  },
  {
    path: '/album',
    element: (
      <PreventRoute>
        <PrivateRoute>
          <AlbumPage />
        </PrivateRoute>
      </PreventRoute>
    ),
  },
  {
    path: '/story',
    element: (
      <PreventRoute>
        <PrivateRoute>
          <RegisterStoryPage />
        </PrivateRoute>
      </PreventRoute>
    ),
  },
  {
    path: '/stories',
    element: (
      <PrivateRoute>
        <ViewStoryPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/tutorial',
    element: <TutorialPage />,
  },
  {
    path: '/*',
    element: <ErrorPage />,
  },
]);
function App() {
  return (
    <>
      <ToastContainer className={'font-bold'} position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
