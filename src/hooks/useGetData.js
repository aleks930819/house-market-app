import { db } from '../../firbase.config';
import { useCallback, useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  onSnapshot,
  startAfter,
} from 'firebase/firestore';

const useGetData = (collectionName, orderBy, where, limit) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
  const [lastElement, setLastElement] = useState(false);

  const getData = useCallback(async () => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy, where, limit);

    try {
      setLoading(true);

      await onSnapshot(q, (querySnapshot) => {
        const data = [];

        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        if (lastVisible !== lastVisibleDoc) {
          setLastVisibleDoc(lastVisible);
        } else {
          setLastElement(true);
          setLoading(false);
          return;
        }

        setData(data);
        setLoading(false);
      });
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [collectionName, orderBy, where, limit, lastVisibleDoc]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const collectionRef = collection(db, collectionName);
  //     const q = query(collectionRef, orderBy, where, limit);

  //     try {
  //       setLoading(true);

  //       // const snapShot = await onSnapshot(q, (querySnapshot) => {
  //       //   const data = [];

  //       //   querySnapshot.forEach((doc) => {
  //       //     data.push({ id: doc.id, ...doc.data() });
  //       //   });

  //       //   const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  //       //   if (lastVisible !== lastFetchedListing) {
  //       //     setLastFetchedListing(lastVisible);
  //       //   } else {
  //       //     setLastElement(true);
  //       //     setLoading(false);
  //       //     return;
  //       //   }

  //       //   setData(data);
  //       //   setLoading(false);
  //       // });

  //       const querySnapshot = await getDocs(q);

  //       const data = querySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));

  //       const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  //       if (lastVisible !== lastFetchedListing) {
  //         setLastFetchedListing(lastVisible);
  //       } else {
  //         setLastElement(true);
  //         setLoading(false);
  //         return;
  //       }

  //       setData(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };
  //   return () => {
  //     getData();
  //   };
  // }, []);

  const fetchMoreData = async () => {
    const collectionRef = collection(db, collectionName);
    const q = query(
      collectionRef,
      orderBy,
      where,
      limit,
      startAfter(lastVisibleDoc)
    );
    try {
      setLoading(true);

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      if (lastVisible === lastVisibleDoc) {
        setLastElement(true);
        setLoading(false);
        return;
      }

      setLastVisibleDoc(lastVisible);

      setData((prevData) => [...prevData, ...data]);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    setData,
    fetchMoreData,
    getData,
  };
};

export default useGetData;
