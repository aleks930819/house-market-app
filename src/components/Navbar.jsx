import { useEffect, useState } from 'react';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import { useMediaQuery } from 'react-responsive';

import { useDispatch, useSelector } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../firbase.config';

import Search from './Search';

import {
  SET_ACTIVE_USER,
  SET_ADMIN,
  SET_PLAN,
  selectUserID,
  SET_SUBSCRIPTION_ID,
} from '../slices/authSlice';
import LinksAndActions from './LinksAndActions';

const Navbar = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 787 });
  const [showMenu, setShowMenu] = useState(false);

  const userID = useSelector(selectUserID);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (!!idTokenResult.claims.admin) {
            dispatch(SET_ADMIN(true));
          }
        });
        const { email, displayName, uid, photoURL } = user;

        dispatch(
          SET_ACTIVE_USER({
            email,
            displayName,
            uid,
            photoURL,
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
          dispatch(SET_SUBSCRIPTION_ID(doc.id));
          setPlan(role);
        });
      }
    };

    checkSubscription();
  }, [userID, dispatch, setPlan]);

  useEffect(() => {
    !isMobile ? setShowMenu(true) : setShowMenu(false);
  }, [isMobile]);

  return (
    <div className="relative">
      <button
        className="text-xl top-[10px] left-[10px] fixed text-white bg-black bg-opacity-70 p-1 rounded-full z-[1000] sm:hidden"
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
      {showMenu && (
        <nav className=" fixed bg-slate-500 sm:bg-slate-200 p-8  w-full  h-full drop-shadow-lg sm:h-1/3  z-[999] sm:relative">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <Search />
            <LinksAndActions setShowMenu={setShowMenu} />
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
