import { limit, orderBy, where } from 'firebase/firestore';
import useGetData from '../hooks/useGetData';
import { useSelector } from 'react-redux';
import { selectUserID } from '../slices/authSlice';
import { useEffect } from 'react';

import Button from '../components/Button';
import Row from './Row';

const BookedListings = () => {
  const userId = useSelector(selectUserID);

  const { data: bookings, getData } = useGetData(
    'bookings',
    orderBy('createdAt', 'desc'),
    where('from', '==', userId),
    limit(10)
  );

  useEffect(() => {
    if (!bookings) {
      getData();
    }
  }, [bookings, getData]);

  console.log(bookings);

  return (
    <>
      <h2 className="font-bold text-lg">My Bookings</h2>
      <Row grid3 className="mb-20">
        {bookings?.map((booking) => (
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
              <Button danger >Cancel</Button>
            </div>
          </div>
        ))}
      </Row>
    </>
  );
};

export default BookedListings;
