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

const Offers = () => {
  const [listings, setListings] = useState(null);

  const params = useParams();

  useEffect(() => {
    const getListings = async () => {
      try {
        const q = query(
          collection(db, 'listings'),
          where('offer', '==', true),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setListings(data);
      } catch (error) {
        toast.error('Something went wrong');
      }
    };
    getListings();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen mb-10">
        <CategoryListingItem data={listings} />
      </div>
    </>
  );
};

export default Offers;
