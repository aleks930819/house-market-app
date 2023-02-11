import Container from '../components/Container';
import { addDays } from 'date-fns';
import { useState } from 'react';
import { DateRangePicker, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import Button from '../components/Button';
import Input from '../components/Input';

const Booking = () => {
  const [guests, setGuests] = useState(0);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);


  return (
    // <Container>
      <div className=" flex flex-col justify-center items-center">
        <div>
          <DateRange
            minDate={new Date()}
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
        <div>
          <Input
            element="input"
            type="number"
            placeholder="Enter number of guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-5 mb-5">
          <Button primary>Book Now</Button>
          <Button primary>Pay Online</Button>
        </div>
      </div>
    // </Container>
  );
};

export default Booking;
