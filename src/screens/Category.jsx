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
  startAt,
} from 'firebase/firestore';

import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

import useFetchMore from '../hooks/useFetchMoreListings';

import { db } from '../../firbase.config';

import CategoryListingItem from '../components/CategoryListingItem';
import Spinner from '../components/Spinner';

const Category = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    setLoading(true);

    const getListings = async () => {

      try {
        const q = query(
          collection(db, 'listings'),
          orderBy('timestamp', 'desc'),
          where('type', '==', params.category),
          limit(10)
        );
        const querySnapshot = await getDocs(q);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setLastFetchedListing(lastVisible);

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

  // const onFetchMoreListings = async () => {
  //   try {
  //     setLoading(true);
  //     const q = query(
  //       collection(db, 'listings'),
  //       where('type', '==', params.category),
  //       orderBy('timestamp', 'desc'),
  //       startAfter(lastFetchedListing),
  //       limit(1)
  //     );
  //     const querySnapshot = await getDocs(q);

  //     const data = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));

  //     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  //     setLastFetchedListing(lastVisible);

  //     setListings((prevState) => [...prevState, ...data]);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  const q = query(
    collection(db, 'listings'),
    orderBy('timestamp', 'desc'),
    where('type', '==', params.category),
    startAfter(lastFetchedListing),
    limit(10)
  );

  const [onFetchMoreListings] = useFetchMore({
    query: q,
    setLastFetchedListing,
    setListings,
    setLoading,
  });


  if (loading) {
    return <Spinner />;
  }

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

export default Category;
