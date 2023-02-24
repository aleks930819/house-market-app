import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import Container from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';
import setChangedValue from '../utils/changeHandler';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firbase.config';
import { useSelector } from 'react-redux';
import { selectBooking } from '../slices/bookingSlice';
import { selectUserID } from '../slices/authSlice';


const Booking = () => {
  // const { data, loading } = useGetDataById('listings', id);

  const { id, name, reservetions } = useSelector(selectBooking);
  const userId = useSelector(selectUserID);



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

  const BookHandler = async () => {
    try {
      const listingRef = doc(db, 'listings', id);

      await updateDoc(listingRef, {
        reservetions: [
          ...reservetions,
          {
            startDate: start,
            endDate: end,
            number: values.number,
            firstName: values.first,
            lastName: values.last,
            email: values.email,
            comments: values.comments,
            userRef:userId,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

 

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
            placeholder="Number of People"
            name="number"
            icon="user"
            handler={changeHandler}
            min="1"
          />

          <Input
            element="input"
            type="text"
            htmlFor="first"
            placeholder="First Name"
            name="first"
            handler={changeHandler}
            icon="user"
          />

          <Input
            element="input"
            type="text"
            htmlFor="last"
            placeholder="Last Name"
            name="last"
            handler={changeHandler}
            icon="user"
          />
          <Input
            element="input"
            type="email"
            htmlFor="email"
            placeholder="Email"
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
