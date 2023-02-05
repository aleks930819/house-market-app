import { MdOutlineExplore, MdOutlineLocalOffer } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { Link } from 'react-router-dom';

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
  return (
    <nav className="bg-slate-200 p-8  w-full   drop-shadow-lg h-1/3">
      <ul className="flex justify-center gap-5 pt-5 sm:justify-end ">
        {data.map((item) => (
          <li key={item.id}>
            <Link
              to={item.link}
              className="flex justify-center items-center gap-1 text-xl md:cursor-pointe"
            >
              {item.icon}
              <h3 className="hidden  sm:block text-base">{item.text}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
