import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { useCallback } from 'react';

const useFetchMore = ({
  query,
  setLastFetchedListing,
  setListings,
  setLoading,
}) => {
  const onFetchMoreListing = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(query);
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
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [query, setLastFetchedListing, setListings, setLoading]);

  return [onFetchMoreListing];
};

export default useFetchMore;
