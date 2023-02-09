import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { doc, collection, getDoc, addDoc, deleteDoc } from 'firebase/firestore';

import { toast } from 'react-toastify';

import { getAuth } from 'firebase/auth';
import { db } from '../../firbase.config';

import Spinner from '../components/Spinner';
import Button from '../components/Button';
import Container from '../components/Container';
import { Facilities } from '../components/Facilities';
import Input from '../components/Input';

const MessagesDetails = () => {
  const { id } = useParams();

  const auth = getAuth();

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState(null);

  const [reply, setReply] = useState('');
  const [listingId, setListingId] = useState(null);
  const [listingDetails, setListingDetails] = useState(null);
  const [lastMessage, setLastMessage] = useState('');

  const [subject, setSubject] = useState('');
  const [senderId, setSenderId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const fetchMessageInfo = async () => {
      const docRf = doc(db, 'messages', id);
      const docSnap = await getDoc(docRf);

      if (docSnap.exists()) {
        const message = [];
        message.push({ id: docSnap.id, ...docSnap.data() });

        setMessage(message);

        setListingId(docSnap.data().listingId);
        setSubject(docSnap.data().subject);
        setSenderId(docSnap.data().senderId);
        setLastMessage(docSnap.data().text);
        setLoading(false);
      } else {
        setMessage(null);
        setLoading(false);
        toast.error('Message not found');
      }
    };

    fetchMessageInfo();
  }, [id]);

  useEffect(() => {
    setLoading(true);

    const fetchListing = async () => {
      const docRf = doc(db, 'listings', listingId);

      try {
        const docSnap = await getDoc(docRf);

        if (docSnap.exists()) {
          const listing = [];
          listing.push({ id: docSnap.id, ...docSnap.data() });
          setListingDetails(listing);
          setLoading(false);
        } else {
          setListingDetails(null);
          setLoading(false);
          toast.error('Listing not found');
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  if (loading) {
    return <Spinner />;
  }

  const changeHandler = (e) => {
    setReply(e.target.value);
  };

  const replyHandler = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'messages'), {
        text: reply,
        createdAt: new Date(),
        lastMessage: lastMessage,
        senderId: auth.currentUser.uid,
        subject: subject,
        name: auth.currentUser.displayName,
        listingId: listingId,
        userRef: senderId,
      });

      setMessage('');
      setReply('');
      navigate('/messages');

      toast.success('Message sent successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();

    try {
      await deleteDoc(doc(db, 'messages', id));
      toast.success('Message deleted successfully');
      navigate('/messages');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Container>
      {message?.map((message) => {
        return (
          <div
            key={message.id}
            className="text-base border shadow-lg p-5 flex flex-col gap-5 w-[300px] sm:w-[550px] md:w-[650px]"
          >
            <h1 className="font-bold">Subject: {message?.subject}</h1>
            <h2>From: {message?.name}</h2>
            {message?.lastMessage && message?.lastMessage.length > 0 && (
              <p>Me: {message?.lastMessage}</p>
            )}
            <div>
              <p>Message: {message?.text}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Input
                element="textarea"
                type="text"
                htmlFor="reply"
                name="reply"
                value={reply}
                handler={changeHandler}
                rows={10}
                cols={150}
                reply={reply}
              />
              <div className="flex  gap-1 items-center">
                <Button primary onClick={replyHandler}>
                  REPLY
                </Button>
                <Button danger onClick={deleteHandler}>
                  DELETE
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="border shadow-md p-5 flex flex-col gap-2 rounded-md cursor-pointer mt-10">
        {listingDetails?.map((listing) => {
          return (
            <div key={listing.id}>
              <div className="flex items-center gap-2">
                <img
                  src={listing?.imgUrls[0]}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex flex-col pl-5">
                  <h1 className="font-bold">{listing?.name}</h1>
                  <Facilities listing={listing} key={listing?.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default MessagesDetails;
