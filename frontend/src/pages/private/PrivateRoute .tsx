import userStore from '@/stores/userStore';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = userStore();

  if (!isLogin) {
    console.log('로그인 후 사용해주세요.');
  }

  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
