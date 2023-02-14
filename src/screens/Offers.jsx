import { where, orderBy, limit } from 'firebase/firestore';

import InfiniteScroll from 'react-infinite-scroll-component';

import CategoryListingItem from '../components/CategoryListingItem';

import useGetData from '../hooks/useGetData';

import Spinner from '../components/Spinner';

const Offers = () => {
  const {
    data: listings,
    loading,
    fetchMoreData,
  } = useGetData(
    'listings',
    orderBy('timestamp', 'desc'),
    where('offer', '==', true),
    limit(10)
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={listings?.length || 0}
        hasMore={true}
        next={fetchMoreData}
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
