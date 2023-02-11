import { Link } from 'react-router-dom';

const LinkItem = ({ link }) => {
  return (
    <li>
      <Link
        to={link.link}
        className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white hover:bg-slate-600 dark:hover:bg-slate-500 "
        onClick={link.onClickHandler}
      >
        <div
          className="w-6 h-6 text-white transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white flex items-center"
          fill="currentColor"
        >
          {link.icon}
        </div>

        {link.img && (
          <img
            src={link.img}
            alt="user"
            className="w-10 h-10 object-cover rounded-full"
          />
        )}

        <span className="ml-3">{link.name}</span>
      </Link>
    </li>
  );
};

export default LinkItem;
