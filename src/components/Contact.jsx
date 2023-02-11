import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useEffect, useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';

import { db } from '../../firbase.config';

import Form from './Form';
import Input from './Input';

import { collection, addDoc } from 'firebase/firestore';

const Contact = ({ subject, userRef }) => {
  const [message, setMessage] = useState('');

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

    try {
      await addDoc(collection(db, 'messages'), {
        text: message,
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

    setMessage('');
  };

  const changeHandler = (e) => {
    setMessage(e.target.value);
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
