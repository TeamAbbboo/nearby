import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import KakaoLoginRedircetPage from '@/pages/login/KakaoLoginRedircetPage';
import SignUpPage from './pages/signup/SignupPage';
import RegisterPage from './pages/register/RegisterPage';
import SoloPage from './pages/familycode/SoloPage';
import GroupPage from './pages/familycode/GroupPage';
import PlaygroundPage from './pages/playground/PlaygroundPage';
import GreenHousePage from './pages/greenhouse/GreenHousePage';
import SplashPage from './pages/splash/SplashPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
    element: <SignUpPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/solo',
    element: <SoloPage />,
  },
  {
    path: '/group',
    element: <GroupPage />,
  },
  {
    path: '/playground',
    element: <PlaygroundPage />,
  },
  {
    path: '/greenhouse',
    element: <GreenHousePage />,
  },
  {
    path: '/splash',
    element: <SplashPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
