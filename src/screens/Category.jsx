import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';

import { toast } from 'react-toastify';

import { db } from '../../firbase.config';
import CategoryListingItem from '../components/CategoryListingItem';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    const getListings = async () => {
      try {
        const q = query(
          collection(db, 'listings'),
          where('type', '==', params.category),
          limit(10)
        );
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setListings(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        toast.error('Something went wrong');
      }
    };
    getListings();
  }, [params.category]);

  if (loading) {
    return (
      <Modal>
        <Spinner />
      </Modal>
    );
  }
  return (
    <div className="flex flex-col min-h-screen mb-10">
      <CategoryListingItem data={listings} />
    </div>
  );
};

export default Category;
