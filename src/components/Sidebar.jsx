import { useRef, useState, useEffect } from 'react';
import { useClickOutside } from '../hooks/useOnClickOutside';

import {
  MdOutlineExplore,
  MdOutlineLocalOffer,
  MdOutlinePersonAddAlt,
  MdOutlineOtherHouses,
  MdOutlineForwardToInbox,
} from 'react-icons/md';

import { RxAvatar } from 'react-icons/rx';
import { FiLogOut } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  SET_ACTIVE_USER,
  SET_LOGOUT,
  selectIsLoggedIn,
  selectPhotoURL,
  SET_ADMIN,
} from '../slices/authSlice';

import AsideItem from './AsideItem';
import AsideButton from './AsideButton';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userPhoto = useSelector(selectPhotoURL);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeClickMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (!!idTokenResult.claims.admin) {
            dispatch(SET_ADMIN(true));
          }
        });

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

  const logoutHandler = () => {
    auth.signOut();
    dispatch(SET_LOGOUT());
    dispatch(SET_ADMIN(false));
    navigate('/');
    toast.success('Logged out successfully');
  };

  useClickOutside(menuRef, closeClickMenu);

  const loggedInLinks = [
    {
      name: 'Profile',
      img: userPhoto,
      link: '/profile',
    },
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
    <div ref={menuRef} className="sm:hidden">
      <AsideButton setIsOpen={setIsOpen} />

      {isOpen && (
        <AsideItem
          loggedOutLinks={loggedOutLinks}
          loggedInLinks={loggedInLinks}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
};

export default Sidebar;
