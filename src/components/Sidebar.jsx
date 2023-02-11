import { useRef, useState, useEffect } from 'react';
import { useClickOutside } from '../hooks/useOnHoverOutside';

import {
  MdOutlineExplore,
  MdOutlineLocalOffer,
  MdOutlinePersonAddAlt,
  MdOutlineOtherHouses,
  MdOutlineForwardToInbox,
} from 'react-icons/md';

import { RxAvatar } from 'react-icons/rx';
import { FiLogOut } from 'react-icons/fi';
import { RiArrowUpSFill } from 'react-icons/ri';

import { useNavigate, Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  SET_ACTIVE_USER,
  SET_LOGOUT,
  selectIsLoggedIn,
  selectPhotoURL,
} from '../slices/authSlice';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const userPhoto = useSelector(selectPhotoURL);

  const closeClickMenu = () => {
    setIsOpen(false);
  };

  const auth = getAuth();
  const dispatch = useDispatch();

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
    <div ref={menuRef}>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>

        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      {isOpen && (
        <aside
          id="separator-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-0 sm:translate-x-0 bg-slate-200 "
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2">

              {!isLoggedIn &&
                loggedOutLinks.map((link) => (
                  <li>
                    <Link
                      to={link.link}
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={link.onClickHandler}
                    >
                      <div
                        className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                      >
                        {link.icon}
                      </div>

                      <span className="ml-3">{link.name}</span>
                    </Link>
                  </li>
                ))}


              {isLoggedIn &&
                loggedInLinks.map((link) => (
                  <li>
                    <Link
                      to={link.link}
                      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={link.onClickHandler}
                    >
                      <div
                        className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                      >
                        {link.icon}
                      </div>

                      {link.img && (
                        <img
                          src={link.img}
                          alt="user"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      )}

                      <span className="ml-3">{link.name}</span>
                    </Link>
                  </li>
                ))}
                
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
