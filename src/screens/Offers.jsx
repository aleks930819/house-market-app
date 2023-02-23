import { where, orderBy, limit } from 'firebase/firestore';

import InfiniteScroll from 'react-infinite-scroll-component';

import CategoryListingItem from '../components/CategoryListingItem';

import useGetData from '../hooks/useGetData';

import Spinner from '../components/Spinner';
import { useEffect } from 'react';

const Offers = () => {
  const {
    data: listings,
    loading,
    fetchMoreData,
    getData,
  } = useGetData(
    'listings',
    orderBy('timestamp', 'desc'),
    where('offer', '==', true),
    limit(10)
  );

  useEffect(() => {
    if (!listings) {
      getData();
    }
  }, [getData,listings]);


  if (loading) {
    return <Spinner />;
  }

  return (
    <InfiniteScroll
      dataLength={listings?.length || 0}
      hasMore={true}
      next={fetchMoreData}
      loader={''}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>There is no more offers</b>
        </p>
      }
    >
      <div className="flex flex-col min-h-screen mb-10">
        <CategoryListingItem data={listings} />
      </div>
    </InfiniteScroll>
  );
};

export default Offers;
