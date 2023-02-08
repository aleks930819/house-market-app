import Form from './Form';
import Input from './Input';

import { useState } from 'react';

const Contact = () => {
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  const changeHandler = (e) => {
    setMessage(e.target.value);
  };


  return (
    <div className='mt-[80px] md:mt-0'>
      <Form onSubmit={onSubmit} heading="Contact Owner" btnName="Send">
        <Input
          element="textarea"
          type="text"
          htmlFor="message"
          placeholder="Your Message Here"
          name="message"
          value={message}
          handler={changeHandler}
          rows={10}
          cols={150}
          message={message}
        />
      </Form>
    </div>
  );
};

export default Contact;
