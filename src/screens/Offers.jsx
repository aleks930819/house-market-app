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

import InfiniteScroll from 'react-infinite-scroll-component';

import { db } from '../../firbase.config';
import CategoryListingItem from '../components/CategoryListingItem';

const Offers = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

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


  const onFetchMoreListings = async () => {
    try {
      const q = query(
        collection(db, 'listings'),
        where('offer', '==', true),
        startAfter(lastFetchedListing),
        limit(10)
      );
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastFetchedListing(lastVisible);

      setListings((prevState) => [...prevState, ...data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <InfiniteScroll
        dataLength={listings.length}
        next={onFetchMoreListings}
        hasMore={true}
        loader={''}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="flex flex-col min-h-screen mb-10">
          <CategoryListingItem data={listings} />
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Offers;
