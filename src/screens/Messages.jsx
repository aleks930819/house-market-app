import { useEffect, useState } from 'react';

import { getAuth } from 'firebase/auth';
import {
  updateDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../../firbase.config';

import Spinner from '../components/Spinner';
import Container from '../components/Container';
import { Link } from 'react-router-dom';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    setLoading(true);

    const fetchUserListings = async () => {
      const propertiesRef = collection(db, 'messages');

      const q = query(
        propertiesRef,
        orderBy('createdAt', 'desc'),
        where('userRef', '==', auth.currentUser.uid),
        limit(10)
      );

      const querySnapshot = await getDocs(q);

      const messages = [];

      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });

      setMessages(messages);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  if (loading) {
    return <Spinner />;
  }


  return (
    <>
      <Container>
        <div className="flex flex-col items-center mt-10 mb-10">
          <h1 className="text-lg font-bold mb-10">
            Messages: {messages.length}
          </h1>
          <div className="flex flex-col items-center overflow-auto max-h-[600px]">
            {messages.map((message) => (
              <Link to={`/messages/${message?.id}`} key={message?.id}>
                <div
                  div
                  className="flex flex-col items-center border p-5 w-[350px] sm:w-[500px] cursor-pointer"
                  key={message?.id}
                >
                  <div className="flex  justify-between  w-full">
                    <h1 className="font-bold">{message?.name}</h1>
                    <p>{message?.subject}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Messages;
