import {
  MdOutlineExplore,
  MdOutlineLocalOffer,
  MdOutlinePersonAddAlt,
  MdOutlineOtherHouses,
  MdOutlineForwardToInbox,
} from 'react-icons/md';

import { FiLogOut } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';


import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import LinkItem from './LinkItem';

import {
  SET_ACTIVE_USER,
  SET_LOGOUT,
  selectIsLoggedIn,
  selectPhotoURL,
} from '../slices/authSlice';

const Navbar = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const userPhoto = useSelector(selectPhotoURL);

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
      }
    });
  }, [auth.currentUser]);

  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.signOut();
    dispatch(SET_LOGOUT());
    navigate('/');
    toast.success('Logged out successfully');
  };

  const loggedInLinks = [
    {
      name: 'Home',
      icon: <MdOutlineOtherHouses />,
      link: '/',
    },
    {
      name: 'Explore',
      icon: <MdOutlineExplore />,
      link: '/explore',
    },
    {
      name: 'Offers',
      icon: <MdOutlineLocalOffer />,
      link: '/offers',
    },
    {
      name: 'Sell/Rent Property',
      icon: <MdOutlinePersonAddAlt />,
      link: '/host',
    },
    {
      name: 'Inbox',
      icon: <MdOutlineForwardToInbox />,
      link: '/messages',
    },

    {
      name: 'Logout',
      icon: <FiLogOut />,
      link: '/',
      onClickHandler: logoutHandler,
    },

    {
      img: userPhoto,
      link: '/profile',
    },
  ];

  const loggedOutLinks = [
    {
      name: 'Home',
      icon: <MdOutlineOtherHouses />,
      link: '/',
    },
    {
      name: 'Explore',
      icon: <MdOutlineExplore />,
      link: '/explore',
    },
    {
      name: 'Offers',
      icon: <MdOutlineLocalOffer />,
      link: '/offers',
    },
    {
      name: 'Sign In / Sign Up',
      icon: <RxAvatar />,
      link: '/sign-in',
    },
  ];

  return (
    <>
      <nav className="bg-slate-200 p-8  w-full   drop-shadow-lg h-1/3 hidden sm:block">
        <ul className="flex justify-center gap-5 pt-5 sm:justify-end ">
          {!isLoggedIn &&
            loggedOutLinks.map((link) => (
              <LinkItem link={link} key={link.name} />
            ))}
          {isLoggedIn &&
            loggedInLinks.map((link) => (
              <LinkItem link={link} key={link.name} />
            ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
