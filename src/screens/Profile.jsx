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
import AddPropertySuggestion from '../components/AddPropertySuggestion';
import { useSelector } from 'react-redux';
import { selectUserID } from '../slices/authSlice';
import useGetData from '../hooks/useGetData';
import Watchlist from '../components/Watchlist';

const Profile = () => {
  const userId = useSelector(selectUserID);

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  const {
    data: properties,
    loading,
    fetchMoreData,
  } = useGetData(
    'listings',
    orderBy('timestamp', 'desc'),
    where('userRef', '==', userId),
    limit(10)
  );

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const onDeleteHandler = async () => {
    try {
      await deleteDoc(doc(db, 'listings', itemToDeleteId));
      toast.success('Listing deleted successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }

    const newFielteredProperties = filteredProperties.filter(
      (listing) => listing.id !== itemToDeleteId
    );

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
      <h2 className="text-white text-sm pb-5 sm:text-lg w-[400px] text-center md:w-[500px]">
        Are you sure you want to delete it?
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
        {properties?.length === 0 ? (
          <AddPropertySuggestion />
        ) : (
          <>
            <MyProperties
              filteredProperties={filteredProperties}
              handleModalView={handleModalView}
              setItemToDeleteId={setItemToDeleteId}
              properties={properties}
              setFilteredProperties={setFilteredProperties}
            />
            {properties?.length >= 10 && (
              <div className="flex justify-center">
                <Button
                  rounded
                  success
                  onClick={fetchMoreData}
                  className="mt-5"
                  disabled={properties.length < 1}
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
        
        <Watchlist />
      </Container>
      {showModal && modal}
    </>
  );
};

export default Profile;
