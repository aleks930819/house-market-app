import {
  MdOutlineExplore,
  MdOutlineLocalOffer,
  MdOutlinePersonAddAlt,
  MdOutlineOtherHouses,
} from 'react-icons/md';

import { RxAvatar } from 'react-icons/rx';
import { FiLogOut } from 'react-icons/fi';
import { RiArrowUpSFill } from 'react-icons/ri';

import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useClickOutside } from '../hooks/useOnHoverOutside';

import {
  SET_ACTIVE_USER,
  SET_LOGOUT,
  selectIsLoggedIn,
  selectPhotoURL,
} from '../slices/authSlice';

import ProfileDropDown from './ProfileDropDown';
import Banner from './Banner';

const Navbar = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const userPhoto = useSelector(selectPhotoURL);

  const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);

  const menuRef = useRef(null);

  const closeHoverMenu = () => {
    setMenuDropDownOpen(false);
  };

  useClickOutside(menuRef, closeHoverMenu);

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

  return (
    <>
      <nav className="bg-slate-200 p-8  w-full   drop-shadow-lg h-1/3">
        <div></div>

        <ul className="flex justify-center gap-5 pt-5 sm:justify-end ">
          {/* <Link
          to="/"
          className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
        >
          <MdOutlineOtherHouses className="text-neutral-600 " />
        </Link> */}
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
            <div ref={menuRef}>
              <div className="">
                <img
                  src={userPhoto}
                  alt="user"
                  className="w-10 h-10 rounded-full cursor-pointer relative"
                  onClick={() => setMenuDropDownOpen(true)}
                />
              </div>
              <div className="absolute top-[100px]  right-[100px]">
                <ProfileDropDown
                  isMenuDropDownOpen={isMenuDropDownOpen}
                  setMenuDropDownOpen={setMenuDropDownOpen}
                  logoutHandler={logoutHandler}
                />
              </div>
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
            >
              <RxAvatar className="text-neutral-600 " />
              <h3 className="hidden  sm:block  sm:text-sm">
                Sign In / Sign Up
              </h3>
            </Link>
          )}
        </ul>
      </nav>

      <Banner />
    </>
  );
};

export default Navbar;
