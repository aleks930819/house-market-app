import LinkItem from './LinkItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  SET_LOGOUT,
  selectIsLoggedIn,
  selectPhotoURL,
  selectIsAdmin,
  SET_ADMIN,
} from '../slices/authSlice';

import {
  MdOutlineExplore,
  MdOutlineLocalOffer,
  MdOutlinePersonAddAlt,
  MdOutlineOtherHouses,
  MdOutlineForwardToInbox,
  MdOutlineAdminPanelSettings,
} from 'react-icons/md';

import { FiLogOut } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';

import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';

const LinksAndActions = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userPhoto = useSelector(selectPhotoURL);
  const isAdmin = useSelector(selectIsAdmin);
  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.signOut();
    dispatch(SET_LOGOUT());
    dispatch(SET_ADMIN(false));
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
      name: 'Add Property',
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
    <ul className="flex flex-col  sm:flex-row justify-center gap-1 pt-5 sm:justify-end ">
      {isAdmin && (
        <LinkItem
          link={{
            name: 'Admin',
            link: '/admin',
            icon: <MdOutlineAdminPanelSettings />,
          }}
        />
      )}
      {!isLoggedIn &&
        loggedOutLinks.map((link) => <LinkItem link={link} key={link.name} />)}
      {isLoggedIn &&
        loggedInLinks.map((link) => <LinkItem link={link} key={link.name} />)}
    </ul>
  );
};

export default LinksAndActions;
