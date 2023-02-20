import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useEffect, useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';

import { db } from '../../firbase.config';

import Form from './Form';
import Input from './Input';

import { collection, addDoc } from 'firebase/firestore';

const Contact = ({ subject, userRef }) => {
  const [contactMessage, setContactMessage] = useState('');

  const auth = getAuth();

  const { id } = useParams();
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (contactMessage.length < 10) {
      toast.error('Message must be at least 10 characters long');
      return;
    } else if (contactMessage.length > 500) {
      toast.error('Message must be less than 500 characters long');
      return;
    }

    try {
      await addDoc(collection(db, 'messages'), {
        text: contactMessage,
        createdAt: new Date(),
        senderId: auth.currentUser.uid,
        subject: subject,
        name: auth.currentUser.displayName,
        listingId: id,
        userRef: userRef,
      });
      toast.success('Message sent');
    } catch (err) {
      toast.error('Could not send message');
    }

    setContactMessage('');
  };

  const changeHandler = (e) => {
    setContactMessage(e.target.value);
  };

  return (
    <div className="mt-[80px] md:mt-0" ref={ref}>
      <Form onSubmit={onSubmit} heading="Contact Owner" btnName="Send">
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
          message={contactMessage}
        />
      </Form>
    </div>
  );
};

export default Contact;
