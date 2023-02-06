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

const Category = () => {
  const [listings, setListings] = useState(null);

  const params = useParams();

  useEffect(() => {
    const getListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');
        // const q = query(
        //   listingsRef,
        //   where('type', '==', params.category),
        //   orderBy('timestamp', 'desc'),
        //   limit(10)
        // );

        // const querySnapshot = await getDocs(q);

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
        console.log(data);
        setListings(data);
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    };
    getListings();
  }, [params.category]);

  return (
    <div className="flex flex-col min-h-screen mb-10">
      <CategoryListingItem data={listings} />
    </div>
  );
};

export default Category;
