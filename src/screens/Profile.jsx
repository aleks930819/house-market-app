import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAuth } from 'firebase/auth';
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

import ProfileCard from '../components/ProfileCard';

const Profile = () => {
  const auth = getAuth();

  const userId = auth.currentUser.uid;


  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <ProfileCard />
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
