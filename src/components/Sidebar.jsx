import { useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../slices/authSlice';

import AsideItem from './AsideItem';
import AsideButton from './AsideButton';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const closeClickMenu = () => {
    setIsOpen(false);
  };

  console.log(isOpen);

  return (
    <div ref={menuRef} className="sm:hidden">
      <AsideButton setIsOpen={setIsOpen} />

      {isOpen && <AsideItem isLoggedIn={isLoggedIn} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Sidebar;
