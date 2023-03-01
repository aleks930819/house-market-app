import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
          dispatch(SET_SUBSCRIPTION_ID(doc.id));
          setPlan(role);
        });
      }
    };

    checkSubscription();
  }, [userID, dispatch, setPlan]);

  return (
    <nav className=" bg-slate-200 p-8  w-full   drop-shadow-lg h-1/3 hidden sm:block">
      <div className="flex justify-between items-center">
        <Search />
        <LinksAndActions />
      </div>
    </nav>
  );
};

export default Navbar;
