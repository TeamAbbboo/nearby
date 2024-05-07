import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  if (
    localStorage.getItem('ACCESS_TOKEN') &&
    localStorage
      .getItem('ACCESS_TOKEN')
      ?.startsWith('eyJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkVXNlcklkIjoia2FrYW8tMzQ1OTkyOTc3M')
  ) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
