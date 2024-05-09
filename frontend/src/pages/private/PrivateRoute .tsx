import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  if (
    localStorage.getItem('ACCESS_TOKEN') &&
    localStorage.getItem('ACCESS_TOKEN')?.startsWith('eyJhbGciOiJIUzI1NiJ9')
  ) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
