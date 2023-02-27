import { Link } from 'react-router-dom';

import { AiFillMessage, AiOutlineUnorderedList } from 'react-icons/ai';
import { TbBrandBooking, TbBusinessplan } from 'react-icons/tb';

import Button from './Button';
import { useSelector } from 'react-redux';
import { selectPlan } from '../slices/authSlice';

const data = [
  {
    id: 1,
    icon: (
      <AiFillMessage className="text-2xl place-items-center text-cyan-900" />
    ),
    title: 'Messages',
    link: '/messages',
  },
  {
    id: 2,
    icon: (
      <TbBrandBooking className="text-2xl place-items-center text-cyan-900" />
    ),
    title: 'Bookings',
    link: '/bookings',
  },
  {
    id: 3,
    icon: (
      <AiOutlineUnorderedList className="text-2xl place-items-center text-cyan-900" />
    ),
    title: 'Watchlist',
    link: '/watchlist',
  },
];

const ProfileCardActions = () => {
  const userPlan = useSelector(selectPlan);

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
      <div className="flex items-center gap-2 cursor-pointer pb-2">
        <Button
          to={userPlan === 'free' ? '/subscription' : ''}
          danger={userPlan === 'free' ? false : true}
          primary={userPlan === 'free' ? true : false}
        >
          {userPlan === 'free' ? 'Upgrade Plan' : 'Cancel Subscription'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileCardActions;
