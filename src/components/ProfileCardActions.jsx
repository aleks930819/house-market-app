import { Link } from 'react-router-dom';


import { ProfileCardActionsData as data } from '../data/data';

const ProfileCardActions = () => {
  return (
    <div>
      {data.map((item) => (
        <Link to={item?.link} key={item?.id}>
          <div className="flex items-center gap-2 cursor-pointer pb-2">
            {item?.icon}
            <h2>{item?.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfileCardActions;
