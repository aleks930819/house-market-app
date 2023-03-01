import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

const LinkItem = ({ link, setShowMenu }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <li onClick={() => (isMobile ? setShowMenu(false) : null)}>
      <Link
        to={link.link}
        className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white  sm:text-neutral-600 "
        onClick={link.onClickHandler}
      >
        {!link.img && (
          <div
            className="w-6 h-6 text-white transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white flex items-center  sm:text-neutral-600"
            fill="currentColor"
          >
            {link.icon}
          </div>
        )}
        {link.img && (
          <div className="flex gap-2 items-center">
            <img
              src={link.img}
              alt="user"
              className="w-10 h-10 object-cover rounded-full 
            sm:w-8 sm:h-8
            "
            />
            <p>Profile</p>
          </div>
        )}

        <span className="ml-3 sm:ml-0">{link.name}</span>
      </Link>
    </li>
  );
};

export default LinkItem;
