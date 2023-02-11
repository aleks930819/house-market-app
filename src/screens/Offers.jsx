import { useState } from 'react';

import { where, orderBy, limit, startAfter } from 'firebase/firestore';

import InfiniteScroll from 'react-infinite-scroll-component';

import CategoryListingItem from '../components/CategoryListingItem';

import useFetchMore from '../hooks/useFetchMoreListings';

import useGetData from '../hooks/useGetData';

import Spinner from '../components/Spinner';

const Offers = () => {
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const {
    data: listings,
    loading,
    setData: setListings,
  } = useGetData(
    'listings',
    orderBy('timestamp', 'desc'),
    where('offer', '==', true),
    limit(10)
  );

  const [onFetchMoreListings] = useFetchMore(
    'listings',
    orderBy('timestamp', 'desc'),
    where('offer', '==', true),
    startAfter(lastFetchedListing),
    limit(10),
    setLastFetchedListing,
    setListings
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={listings?.length || 0}
        hasMore={true}
        next={onFetchMoreListings}
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
