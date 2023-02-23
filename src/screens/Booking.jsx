import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import Container from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';

const Booking = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

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
            placeholder="Number of People"
            name="number"
            icon="user"
            min="1"
          />

          <Input
            element="input"
            type="text"
            htmlFor="first"
            placeholder="First Name"
            name="first"
            icon="user"
          />

          <Input
            element="input"
            type="text"
            htmlFor="last"
            placeholder="Last Name"
            name="last"
            icon="user"
          />
          <Input
            element="input"
            type="email"
            htmlFor="email"
            placeholder="Email"
            name="email"
            icon="email"
          />

          <Input
            element="textarea"
            type="text"
            htmlFor="comments"
            placeholder="Comments"
            name="comments"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <Button primary>Book</Button>
        <Button primary>Pay Online</Button>
      </div>
    </Container>
  );
};

export default Booking;
