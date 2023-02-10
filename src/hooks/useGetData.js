import { db } from '../../firbase.config';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, onSnapshot } from 'firebase/firestore';

const useGetData = (collectionName, orderBy, where, limit) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const collectionRef = collection(db, collectionName);

  useEffect(() => {
    const getData = async () => {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, orderBy, where, limit);

      try {
        setLoading(true);

        const snapShot = await onSnapshot(q, (querySnapshot) => {
          const data = [];

          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          setData(data);
          setLoading(false);
        });

        const lastVisible = snapShot.docs[snapShot.docs.length - 1];
        setLastFetchedListing(lastVisible);

        // const data = [];
        // querySnapshot.forEach((doc) => {
        //   data.push({ id: doc.id, ...doc.data() });
        // });

        // setData(data);
        // setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  return {
    data,
    loading,
    error,
    setData,
    lastFetchedListing,
    setLastFetchedListing,
  };
};

export default useGetData;
