import { MdOutlineExplore, MdOutlineLocalOffer } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { FiLogOut } from 'react-icons/fi';

import { useNavigate,Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import  useAuthStatus  from '../hooks/useAuthStatus';




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

  // const [user, setUser] = useState(null);

  const { loggedIn, checkingStatus } = useAuthStatus();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // }, [auth.currentUser]);

  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.signOut();
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

        {loggedIn ? (
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
