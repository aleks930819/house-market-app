import { Navigate } from 'react-router-dom';

import useAuthStatus from '../hooks/useAuthStatus';

import Spinner from './Spinner';
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../slices/authSlice';

const PrivateRoute = ({ children, admin }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const isAdmin = useSelector(selectIsAdmin);

  if (checkingStatus) {
    return <Spinner />;
  }

  if (admin) {
    return isAdmin ? children : <Navigate to="/" />;
  }

  return loggedIn ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
