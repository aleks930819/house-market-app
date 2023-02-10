import { Link } from 'react-router-dom';

import { AiFillMessage } from 'react-icons/ai';


import { getAuth } from 'firebase/auth';

import Button from '../components/Button';

import DefaultProfilePhoto from '../assets/images/profile.jpg';
import { useSelector } from 'react-redux';
import { selectPhotoURL,selectDisplayName,selectEmail,selectUserID } from '../slices/authSlice';

const ProfileCard = () => {
  


  const photo = useSelector(selectPhotoURL);
  const email  = useSelector(selectEmail);
  const displayName = useSelector(selectDisplayName);
  const uid = useSelector(selectUserID);


  return (
    <div className="mt-10 text-xs sm:text-md  border shadow-md p-5 flex flex-col gap-2 rounded-md ">
      <div className="grid grid-cols-2 place-items-center">
        <div className="w-16 h-16">
          <img
            src={photo || DefaultProfilePhoto}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <Link to="/messages">
          <div className="flex items-center gap-2 cursor-pointer">
            <AiFillMessage className="text-2xl place-items-center text-cyan-900" />
            <h2>My Messages</h2>
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center mt-5">
        <h1 className="text-sm font-bold">{displayName}</h1>
        <p>{email}</p>
      </div>
      <div className="flex  gap-2 mt-5">
        <Button to={`/edit/${uid}`} primary>
          Edit Profile
        </Button>
        <Button danger>Delete Profile</Button>
      </div>
    </div>
  );
};

export default ProfileCard;
