import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import Container from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';
import setChangedValue from '../utils/changeHandler';

import { v4 as uuidv4 } from 'uuid';

import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firbase.config';
import { useSelector } from 'react-redux';
import { selectBooking } from '../slices/bookingSlice';
import { selectUserID } from '../slices/authSlice';
import { useNavigate, useParams } from 'react-router-dom';

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
    email: '',
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

    if (!values.number || !values.first || !values.last || !values.email) {
      return toast.error(
        'Number of people, first name, last name, email  are required'
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

  // const BookHandler = async () => {
  //   try {
  //     await addDoc(collection(db, 'bookings'), {
  //       createdAt: new Date(),
  //       from: userId,
  //       listingId: id,
  //       startDate: start,
  //       endDate: end,
  //       totalPrice,
  //       imgUrls,
  //       name,
  //       ...values,
  //     });
  //     navigate('/');

  //     toast.success('Booking Successful');
  //   } catch (err) {
  //     toast.error('Something went wrong');
  //   }
  // };

  return (
    <Container>
      {/* <div className="flex"> */}
      {/* <h1 className="text-2xl text-center pb-2">{data?.[0]?.name}</h1>
        <img
          src={data?.[0]?.imgUrls[0]}
          alt=""
          className="w-96 h-96 object-cover rounded-md"
        />
      </div> */}
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
            type="email"
            htmlFor="email"
            placeholder="*Email"
            name="email"
            handler={changeHandler}
            icon="email"
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
          Book
        </Button>
        <Button primary>Pay Online</Button>
      </div>
    </Container>
  );
};

export default Booking;
