import {
  MdOutlineExplore,
  MdOutlineLocalOffer,
  MdOutlinePersonAddAlt,
  MdOutlineOtherHouses,
  MdOutlineForwardToInbox,
  MdOutlineAdminPanelSettings,
} from 'react-icons/md';

import { GrUserAdmin } from 'react-icons/gr';

import { FiLogOut } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  collection,
  getDocs,
  collectionGroup,
  doc,
  getDoc,
} from 'firebase/firestore';

import { db } from '../../firbase.config';

import LinkItem from './LinkItem';
import Search from './Search';

import {
  SET_LOGOUT,
  selectIsLoggedIn,
  selectPhotoURL,
  selectIsAdmin,
  SET_ACTIVE_USER,
  SET_ADMIN,
  SET_PLAN,
  selectUserID,
} from '../slices/authSlice';

const Navbar = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userPhoto = useSelector(selectPhotoURL);
  const isAdmin = useSelector(selectIsAdmin);
  const userID = useSelector(selectUserID);
  const [plan, setPlan] = useState(null);

  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.signOut();
    dispatch(SET_LOGOUT());
    dispatch(SET_ADMIN(false));
    dispatch(SET_PLAN('free'));
    navigate('/');
    toast.success('Logged out successfully');
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
  }, [auth, dispatch]);

  useEffect(() => {
    const checkSubscription = async () => {
      if (userID) {
        const ref = collection(db, `customers/${userID}/subscriptions`);
        const snapshot = await getDocs(ref);

        snapshot.forEach((doc) => {
          const { role } = doc.data();
          dispatch(SET_PLAN(role));
          setPlan(role);
        });
      }
    };

    checkSubscription();
  }, [userID, dispatch, setPlan]);


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
    <nav className=" bg-slate-200 p-8  w-full   drop-shadow-lg h-1/3 hidden sm:block">
      <div className="flex justify-between items-center">
        <Search />
        <ul className="flex justify-center gap-1 pt-5 sm:justify-end ">
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
  );
};

export default Navbar;
