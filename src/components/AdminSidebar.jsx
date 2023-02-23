import { FiUsers, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineFileSearch } from 'react-icons/ai';

const data = [
  {
    id: 1,
    name: 'Users',
    icon: <FiUsers />,
    type: 'users',
  },
  {
    id: 2,
    name: 'Listings',
    icon: <AiOutlineFileSearch />,
    type: 'listings',
  },
  {
    id: 3,
    name: 'Messages',
    icon: <FiMessageSquare />,
    type: 'messages',
  },
];

const AdminSidebar = ({  filterProperties }) => {
  return (
    <div className="h-full text-base md:text-xl border-r-2 text-neutral-600 bg-slate-300">
      <div>
        <div className="flex justify-center items-center flex-col gap-5 ">
          <h3 className="mt-10 font-bold mr-10">Dashboard</h3>
          <ul>
            {data.map((item) => (
              <li
                className="flex gap-2 justify-start items-center cursor-pointer pb-3  p-2 rounded-full"
                key={item.id}
                onClick={() => {
                  filterProperties(item.type);
                }}
              >
              
                {item.icon}
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
