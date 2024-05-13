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
import SplashHomePage from '@/pages/splash/SplashHomePage';
import SplashPlaygroundPage from '@/pages/splash/SplashPlaygroundPage';
import SplashGreenhousePage from '@/pages/splash/SplashGreenhousePage';
import PreventRoute from '@/pages/private/PreventRoute';
import PrivateRoute from '@/pages/private/PrivateRoute ';

/* libraries */
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashHomePage />,
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
    path: '/splashPlayground',
    element: (
      <PrivateRoute>
        <SplashPlaygroundPage />
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
