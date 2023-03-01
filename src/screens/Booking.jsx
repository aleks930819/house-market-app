import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import Container from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';
import setChangedValue from '../utils/changeHandler';

import { v4 as uuidv4 } from 'uuid';

import {  doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firbase.config';
import { useSelector } from 'react-redux';
import { selectBooking } from '../slices/bookingSlice';
import { selectUserID } from '../slices/authSlice';
import { useNavigate,} from 'react-router-dom';

import { toast } from 'react-toastify';
import useGetBookings from '../hooks/useGetBookings';


const Booking = () => {
  const userId = useSelector(selectUserID);

  const { id, name, imgUrls, price } = useSelector(selectBooking);

  const [reservedDates, setReservedDates] = useState(false);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    number: '',
    first: '',
    last: '',
    phone: '',
    comments: '',
  });

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [pricePerNight, setPricePerNight] = useState(price);

  const changeHandler = (e) => {
    setChangedValue(e, setValues);
  };

  const start = new Date(state[0].startDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const end = new Date(state[0].endDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const totalPrice =
    (price * (state[0].endDate - state[0].startDate)) / 86400000;

  const { bookings } = useGetBookings();

  const BookHandler = async () => {
    if (!userId) {
      return navigate('/login');
    }

    if (!values.number || !values.first || !values.last || !values.phone) {
      return toast.error(
        'Number of people, first name, last name and phone  are required'
      );
    }

    const booking = {
      createdAt: new Date(),
      from: userId,
      listingId: id,
      startDate: start,
      endDate: end,
      totalPrice,
      imgUrls,
      name,
      id: uuidv4(),
      ...values,
    };
    try {
      const userRef = doc(db, 'users', userId);

      if (bookings) {
        await updateDoc(userRef, {
          bookings: [...bookings, booking],
        });
      } else {
        await updateDoc(userRef, {
          bookings: [booking],
        });
      }

      navigate('/');

      toast.success('Booking Successful');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Container>
      <div className="flex flex-col sm:flex-row gap-2">
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          minDate={new Date()}
          className="border-2 border-gray-300 rounded-md "
        />
        <div className="flexflex-col ">
          <Input
            element="input"
            type="number"
            htmlFor="number"
            placeholder="*Number of People"
            name="number"
            icon="user"
            handler={changeHandler}
            min="1"
          />

          <Input
            element="input"
            type="text"
            htmlFor="first"
            placeholder="*First Name"
            name="first"
            handler={changeHandler}
            icon="user"
          />

          <Input
            element="input"
            type="text"
            htmlFor="last"
            placeholder="*Last Name"
            name="last"
            handler={changeHandler}
            icon="user"
          />
          <Input
            element="input"
            type="phone"
            htmlFor="phone"
            placeholder="*Phone Number"
            name="phone"
            handler={changeHandler}
            icon="phone"
          />

          <Input
            element="textarea"
            type="text"
            htmlFor="comments"
            handler={changeHandler}
            placeholder="Comments"
            name="comments"
          />
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-lg text-center pb-2">
          {start} - {end}
        </h2>
        <p>Total: ${totalPrice.toFixed(2)} </p>
      </div>

      <div className="flex gap-2 mt-5">
        <Button primary onClick={BookHandler}>
          Book Now
        </Button>
      </div>
    </Container>
  );
};

export default Booking;
