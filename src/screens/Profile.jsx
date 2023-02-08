import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AiFillMessage } from 'react-icons/ai';

import { getAuth, updateProfile } from 'firebase/auth';
import {
  updateDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../../firbase.config';

import Spinner from '../components/Spinner';
import Container from '../components/Container';
import Button from '../components/Button';
import Modal from '../components/Modal';
import MyProperties from '../components/MyProperties';

import DefaultProfilePhoto from '../assets/images/profile.jpg';

const Profile = () => {
  const auth = getAuth();

  const userId = auth.currentUser.uid;

  console.log(userId);

  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchUserListings = async () => {
      const propertiesRef = collection(db, 'listings');

      const q = query(propertiesRef, where('userRef', '==', userId));

      const querySnapshot = await getDocs(q);

      const properties = [];

      querySnapshot.forEach((doc) => {
        properties.push({ id: doc.id, ...doc.data() });
      });

      setProperties(properties);
      setFilteredProperties(properties);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  if (loading) {
    return <Spinner />;
  }

  const onDeleteHandler = async () => {
    try {
      await deleteDoc(doc(db, 'listings', itemToDeleteId));
      toast.success('Listing deleted successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }

    const newListings = properties.filter(
      (listing) => listing.id !== itemToDeleteId
    );
    const newFielteredProperties = filteredProperties.filter(
      (listing) => listing.id !== itemToDeleteId
    );
    setProperties(newListings);
    setFilteredProperties(newFielteredProperties);
    setShowModal(false);
  };

  const handleModalView = () => {
    setShowModal(!showModal);
  };

  const action = (
    <div className="flex gap-2">
      <Button rounded success onClick={onDeleteHandler}>
        YES
      </Button>
      <Button rounded danger onClick={handleModalView}>
        NO
      </Button>
    </div>
  );

  const modal = (
    <Modal action={action}>
      <h2 className="text-white text-xs pb-5 sm:text-lg">
        Are you sure you want to delete?
      </h2>
    </Modal>
  );

  return (
    <>
      <Container>
        <div className="mt-10 text-xs sm:text-md  border shadow-md p-5 flex flex-col gap-2 rounded-md ">
          <div className="grid grid-cols-2 place-items-center">
            <div className="w-16 h-16">
              <img
                src={auth.currentUser.photoURL || DefaultProfilePhoto}
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
            <h1 className="text-sm font-bold">
              {auth.currentUser.displayName}
            </h1>
            <p>{auth.currentUser.email}</p>
          </div>
          <div className="flex  gap-2 mt-5">
            <Button to={`/edit/${userId}`} primary>
              Edit Profile
            </Button>
            <Button danger>Delete Profile</Button>
          </div>
        </div>

        <MyProperties
          filteredProperties={filteredProperties}
          handleModalView={handleModalView}
          setItemToDeleteId={setItemToDeleteId}
          properties={properties}
          setFilteredProperties={setFilteredProperties}
        />
      </Container>
      {showModal && modal}
    </>
  );
};

export default Profile;
