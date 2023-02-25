import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserID } from '../slices/authSlice';
import { db } from '../../firbase.config';

const useGetBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userID = useSelector(selectUserID);

  useEffect(() => {
    const getBookingsData = async (watchlist) => {
      try {
        const userRef = doc(db, 'users', userID);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            setBookings(userDoc.data().bookings);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBookingsData();
  }, [userID]);

  return { bookings };
};

export default useGetBookings;
