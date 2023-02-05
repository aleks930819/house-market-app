import { MdOutlineExplore, MdOutlineLocalOffer } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';



const Navbar = () => {
  return (
    <nav className="bg-slate-200 p-8  w-full   drop-shadow-lg">
      <ul className="flex justify-center gap-5 pt-5 sm:justify-end ">
        <li className="flex justify-center items-center gap-1 text-xl md:cursor-pointer">
          <MdOutlineExplore className="text-neutral-600 " />
          <h3 className="hidden  sm:block text-base">Explore</h3>
        </li>
        <li className="flex justify-center items-center gap-1 text-xl md:cursor-pointer">
          <MdOutlineLocalOffer className="text-neutral-600" />
          <h3 className="hidden   sm:block  text-base">Offers</h3>
        </li>
        <li className="flex justify-center items-center gap-1 text-xl md:cursor-pointer ">
          <RxAvatar className="text-neutral-600" />
          <h3 className="hidden sm:block  text-base">Sign In / Sign Up</h3>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
