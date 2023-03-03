import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserID } from '../slices/authSlice';
import { db } from '../../firbase.config';

const useGetWatchlistData = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [error, setError] = useState(null);
  const userID = useSelector(selectUserID);

  useEffect(() => {
    const getWatchlistData = async (watchlist) => {
      try {
        const userRef = doc(db, 'users', userID);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setWatchlistData(userDoc.data().watchlist);
        }
      } catch (error) {
        setError(error);
      }
    };

    getWatchlistData();
  }, [userID]);

  return { watchlistData };
};

export default useGetWatchlistData;
