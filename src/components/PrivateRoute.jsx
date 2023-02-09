import { Navigate, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from '../slices/authSlice';
import { useSelector } from 'react-redux';

const PrivateRoute = ({children}) => {

  const isLoggedIn = useSelector(selectIsLoggedIn);




  return isLoggedIn == true ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
