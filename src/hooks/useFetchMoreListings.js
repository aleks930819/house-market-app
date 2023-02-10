import { getDocs } from 'firebase/firestore';
import { useCallback } from 'react';

import { db } from '../../firbase.config';

import { collection, query } from 'firebase/firestore';

const useFetchMore = ({
  collectionName,
  orderBy,
  where,
  startAfter,
  limit,
  setLastFetchedListing,
  setListings,
}) => {
  
  const onFetchMoreListing = useCallback(async () => {
    try {
      const collectionRef = collection(db, collectionName);

      const q = query(collectionRef, orderBy, where, startAfter, limit);

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      if (!lastVisible) {
        return;
      }

      setLastFetchedListing(lastVisible);

      setListings((prevState) => [...prevState, ...data]);
    } catch (err) {}
  }, [query, setLastFetchedListing, setListings]);

  return [onFetchMoreListing];
};

export default useFetchMore;
