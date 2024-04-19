import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/signup/SignUpPage';
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
    path: '/signup',
    element: <SignUpPage />,
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
