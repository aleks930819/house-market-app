import {
  MdOutlineExplore,
  MdOutlineLocalOffer,
  MdOutlinePersonAddAlt,
} from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { FiLogOut } from 'react-icons/fi';

import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import useAuthStatus from '../hooks/useAuthStatus';
import { SET_ACTIVE_USER, SET_LOGOUT, selectIsLoggedIn } from '../slices/authSlice';

const data = [
  {
    id: 1,
    icon: <MdOutlineExplore className="text-neutral-600 " />,
    text: 'Explore',
    link: '/explore',
  },
  {
    id: 2,
    icon: <MdOutlineLocalOffer className="text-neutral-600" />,
    text: 'Offers',
    link: '/offers',
  },
  {
    id: 3,
    icon: <RxAvatar className="text-neutral-600" />,
    text: 'Sign In / Sign Up',
    link: '/sign-in',
  },
];

const Navbar = () => {

  const auth = getAuth();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const isLoggedIn = useSelector(selectIsLoggedIn);



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      if (user) {


        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            name: user.displayName,
            uid: user.uid,
            photo: user.photoURL,
          })
        );

        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth.currentUser]);

  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.signOut();
    dispatch(SET_LOGOUT());
    navigate('/');
  };

  return (
    <nav className="bg-slate-200 p-8  w-full   drop-shadow-lg h-1/3 ">
      <ul className="flex justify-center gap-5 pt-5 sm:justify-end ">
        <li>
          <Link
            to="/explore"
            className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
          >
            <MdOutlineExplore className="text-neutral-600 " />
            <h3 className="hidden  sm:block  sm:text-sm">Explore</h3>
          </Link>
        </li>
        <li>
          <Link
            to="/offers"
            className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
          >
            <MdOutlineLocalOffer className="text-neutral-600 " />
            <h3 className="hidden  sm:block  sm:text-sm">Offers</h3>
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link
                to="/profile"
                className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
              >
                <RxAvatar className="text-neutral-600 " />
                <h3 className="hidden  sm:block  sm:text-sm">Profile</h3>
              </Link>
            </li>

            <li>
              <Link
                to="/host"
                className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
              >
                <MdOutlinePersonAddAlt className="text-neutral-600 " />
                <h3 className="hidden  sm:block  sm:text-sm">Become a host</h3>
              </Link>
            </li>

            <li onClick={() => logoutHandler()}>
              <Link
                to="/logout"
                className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
              >
                <FiLogOut className="text-neutral-600 " />
                <h3 className="hidden  sm:block  sm:text-sm">Logout</h3>
              </Link>
            </li>
          </>
        ) : (
          <Link
            to="/sign-in"
            className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
          >
            <RxAvatar className="text-neutral-600 " />
            <h3 className="hidden  sm:block  sm:text-sm">Sign In / Sign Up</h3>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
