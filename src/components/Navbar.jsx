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
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import { getAuth } from 'firebase/auth';

import LinkItem from './LinkItem';
import Search from './Search';

import {
  SET_ACTIVE_USER,
  SET_LOGOUT,
  selectIsLoggedIn,
  selectPhotoURL,
  selectEmail,
} from '../slices/authSlice';

const Navbar = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userPhoto = useSelector(selectPhotoURL);

  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  const logoutHandler = () => {
    auth.signOut();
    dispatch(SET_LOGOUT());
    navigate('/');
    toast.success('Logged out successfully');
  };

  const userEmail = useSelector(selectEmail);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (!!idTokenResult.claims.admin) {
            setAdmin(true);
          }
        });
      }
    });
  }, [userEmail]);

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
      <nav className=" bg-slate-200 p-8  w-full   drop-shadow-lg h-1/3 hidden sm:block">
        <div className="flex justify-between items-center">
          <Search  />
          <ul className="flex justify-center gap-1 pt-5 sm:justify-end ">
            {!isLoggedIn &&
              loggedOutLinks.map((link) => (
                <LinkItem link={link} key={link.name} />
              ))}
            {isLoggedIn &&
              loggedInLinks.map((link) => (
                <LinkItem link={link} key={link.name} />
              ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
