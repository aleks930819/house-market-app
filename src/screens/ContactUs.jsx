import { useState } from 'react';
import Container from '../components/Container';
import Form from '../components/Form';
import Input from '../components/Input';

import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';

import {db } from '../../firbase.config';
import { useSelector } from 'react-redux';
import { selectDisplayName, selectUserID } from '../slices/authSlice';

const ContactUs = () => {
  const [contactMessage, setContactMessage] = useState('');

  const userUid = useSelector(selectUserID);
  const userName = useSelector(selectDisplayName);

  const changeHandler = (e) => {
    setContactMessage(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (contactMessage.length < 10) {
      toast.error('Message must be at least 10 characters long');
      return;
    } else if (contactMessage.length > 500) {
      toast.error('Message must be less than 500 characters long');
      return;
    }

    try {
      await addDoc(collection(db, 'contact-us'), {
        text: contactMessage,
        createdAt: new Date(),
        from: userUid,
        name: userName,
      });
      toast.success('Message sent');
    } catch (err) {
        console.log(err);
      toast.error('Could not send message');
    }

    setContactMessage('');
  };

  return (
    <Container>
      <div className="p-5">
        <Form heading="Contact Us" btnName="Send" onSubmit={submitHandler}>
          <div className="flex flex-col sm:flex-row gap-5 mb-5">
            <p>Phone: 123-456-7890</p>
            <p>Email: example@gmail.com</p>
          </div>

          <Input
            element="textarea"
            type="text"
            htmlFor="message"
            placeholder="Your Message Here..."
            name="message"
            value={contactMessage}
            handler={changeHandler}
            rows={10}
            cols={150}
            message
          />
        </Form>
      </div>
    </Container>
  );
};

export default ContactUs;
