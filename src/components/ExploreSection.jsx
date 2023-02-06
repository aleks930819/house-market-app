import Button from './Button';
import Card from './Card';

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

import { db } from '../../firbase.config';

import { toast } from 'react-toastify';

const ExploreSection = () => {
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const getListings = async () => {
      try {
        const q = query(
          collection(db, 'listings'),
          where('type', '==', 'rent'),
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
    <div className="mb-10">
      <h2 className="pt-10  text-center md:text-lg">Explore Rentals</h2>
      <div className="flex flex-col justify-center items-center mt-10 md:flex-row gap-5 sm:pl-5 sm:pr-5  lg:w-3/4 mx-auto ">
        {listings?.slice(0, 3).map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Button primary roundedSmall to="/category/rent">
          View More
        </Button>
      </div>
    </div>
  );
};

export default ExploreSection;
