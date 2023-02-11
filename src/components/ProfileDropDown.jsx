import { Link } from 'react-router-dom';

import { MdOutlinePersonAddAlt } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';

import { useSelector } from 'react-redux';

const ProfileDropDown = ({
  isMenuDropDownOpen,
  setMenuDropDownOpen,
  logoutHandler,
}) => {
  return (
    <div
      className="flex flex-col justify-center items-center gap-4 absolute text-white bg-black opacity-80 
       w-60 h-40  right-[-50px] z-50 rounded-md shadow-md 
      "
      style={{
        display: isMenuDropDownOpen ? 'flex' : 'none',
        zIndex: '100',
      }}
    >
      <li>
        <Link
          to="/profile"
          className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
        >
          <RxAvatar />
          <h3 className="text-xs sm:block  sm:text-sm">Profile</h3>
        </Link>
      </li>

      <li>
        <Link
          to="/host"
          className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
        >
          <MdOutlinePersonAddAlt />
          <h3 className="text-xs  sm:block  sm:text-sm">
            Sell / Rent Your Property
          </h3>
        </Link>
      </li>

      <li onClick={() => logoutHandler()}>
        <Link
          to="/logout"
          className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
        >
          <FiLogOut />
          <h3 className="text-xs  sm:block  sm:text-sm">Logout</h3>
        </Link>
      </li>
    </div>
  );
};

export default ProfileDropDown;
