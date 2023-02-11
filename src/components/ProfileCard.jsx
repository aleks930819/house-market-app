import { Link, useNavigate } from 'react-router-dom';

import { AiFillMessage } from 'react-icons/ai';

import { getAuth, deleteUser } from 'firebase/auth';

import Button from '../components/Button';

import { toast } from 'react-toastify';

import DefaultProfilePhoto from '../assets/images/profile.jpg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPhotoURL,
  selectDisplayName,
  selectEmail,
  selectUserID,
  SET_LOGOUT,
} from '../slices/authSlice';
import { useState } from 'react';
import Modal from './Modal';

const ProfileCard = () => {
  const photo = useSelector(selectPhotoURL);
  const email = useSelector(selectEmail);
  const displayName = useSelector(selectDisplayName);
  const uid = useSelector(selectUserID);

  const auth = getAuth();
  const user = auth.currentUser;

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteUser(user)
      .then(() => {
        toast.success('Account deleted');
        dispatch(SET_LOGOUT());
        navigate('/');
      })
      .catch((error) => {
        toast.error('Error deleting account');
      });
  };

  const handleModalView = () => {
    setShowModal(!showModal);
  };

  const action = (
    <div className="flex gap-2">
      <Button rounded success onClick={handleDelete}>
        YES
      </Button>
      <Button rounded danger onClick={handleModalView}>
        NO
      </Button>
    </div>
  );

  const modal = (
    <Modal action={action}>
      <h2 className="text-white text-sm pb-5 sm:text-lg w-[400px] text-center md:w-[500px]">
        Are you sure you want to delete this account?
      </h2>
    </Modal>
  );

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
        <Button danger onClick={() => setShowModal(true)}>
          Delete Profile
        </Button>
      </div>
      {showModal && modal}
    </div>
  );
};

export default ProfileCard;
