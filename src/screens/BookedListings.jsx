import { limit, orderBy, where } from 'firebase/firestore';
import useGetData from '../hooks/useGetData';
import { useSelector } from 'react-redux';
import { selectUserID } from '../slices/authSlice';
import { useEffect, useState } from 'react';

import Button from '../components/Button';

import Row from '../components/Row';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firbase.config';
import { toast } from 'react-toastify';

import Modal from '../components/Modal';

import useGetBookings from '../hooks/useGetBookings';

const BookedListings = () => {
  const userId = useSelector(selectUserID);

  const [showModal, setShowModal] = useState(false);
  const [itemToCancelId, setItemToCancelId] = useState(null);
  const [bookingList, setBookingList] = useState([]);

  const { bookings } = useGetBookings();

  useEffect(() => {
    setBookingList(bookings);
  }, [bookings]);

  // const { data: bookings, getData } = useGetData(
  //   'bookings',
  //   orderBy('createdAt', 'desc'),
  //   where('from', '==', userId),
  //   limit(10)
  // );

  // useEffect(() => {
  //   if (!bookings) {
  //     getData();
  //   }
  // }, [bookings, getData]);

  const cancelBooking = async (itemToDeleteId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const bookingsList = userDoc.data().bookings;
        const newBookingList = bookingsList.filter(
          (item) => item.id !== itemToDeleteId
        );

        await updateDoc(userRef, {
          bookings: newBookingList,
        });
        handleModalView();
      }
      setBookingList(bookingList.filter((item) => item.id !== itemToDeleteId));
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  // const cancelBooking = async (id) => {
  //   try {
  //     await deleteDoc(doc(db, 'bookings', id));
  //     handleModalView();
  //     toast.success('Booking cancelled successfully');
  //   } catch (error) {
  //     toast.error('Something went wrong');
  //   }
  // };

  const handleModalView = () => {
    setShowModal((prev) => !prev);
  };

  const modal = (
    <Modal>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-base sm:text-lg text-white">
          Are you sure you want to cancel?
        </h1>
        <div className="flex gap-2 mt-2 items-center justify-center">
          <Button rounded danger onClick={() => cancelBooking(itemToCancelId)}>
            YES
          </Button>
          <Button rounded success onClick={handleModalView}>
            NO
          </Button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="flex justify-center items-center mx-auto h-screen">
      {bookingList?.length === 0 && (
        <h1 className="font-bold text-2xl text-gray-500">
          You have no bookings yet
        </h1>
      )}
      <Row grid3 className="mb-20">
        {bookingList?.map((booking) => (
          <div
            className="border shadow-md p-5 flex flex-col gap-2 rounded-md cursor-pointer"
            key={booking?.id}
          >
            <div className="flex items-center gap-2">
              <img
                src={booking?.imgUrls[0]}
                className="w-16 h-16 object-cover rounded-md"
                alt={booking?.name}
              />
              <div className="flex flex-col pl-5 gap-2">
                <h1 className="font-bold">{booking?.name}</h1>
                <p className="text-sm text-gray-500">
                  On the name: {booking?.first} {booking?.last}
                </p>
                <p className="text-sm text-gray-500">
                  From: {booking?.startDate}
                </p>
                <p className="text-sm text-gray-500">To: {booking?.endDate}</p>

                <p className="text-sm text-gray-500">
                  Number of people: {booking?.number}
                </p>

                <p className="text-sm text-gray-500">
                  Total: ${booking?.totalPrice.toFixed(2)} (incl. taxes)
                </p>
                <p className="text-sm text-gray-500">Paid: No</p>
              </div>
            </div>

            <div className="flex gap-1 pt-5">
              <Button
                danger
                onClick={() => {
                  setItemToCancelId(booking?.id);
                  handleModalView();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ))}
      </Row>
      {showModal && modal}
    </div>
  );
};

export default BookedListings;
