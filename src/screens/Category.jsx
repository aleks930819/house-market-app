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

import useFetchMore from '../hooks/useFetchMoreListings';

import { db } from '../../firbase.config';

import CategoryListingItem from '../components/CategoryListingItem';
import Spinner from '../components/Spinner';
import useScrollToTop from '../hooks/useScrollToTop';
import ScrollToTopButton from '../components/ScrollToTopButton';
import useGetData from '../hooks/useGetData';

const Category = () => {
  const { isVisible } = useScrollToTop();

  const params = useParams();

  const {
    data: listings,
    loading,
    setData: setListings,
    lastFetchedListing,
    setLastFetchedListing,
  } = useGetData(
    'listings',
    orderBy('timestamp', 'desc'),
    where('type', '==', params.category),
    limit(10)
  );

  const [onFetchMoreListings] = useFetchMore(
    'listings',
    orderBy('timestamp', 'desc'),
    where('type', '==', params.category),
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
          {isVisible && <ScrollToTopButton />}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Category;
