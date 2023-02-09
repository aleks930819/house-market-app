import { useEffect, useState } from 'react';

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
import { useSelector } from 'react-redux';
import { selectUserID } from '../slices/authSlice';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = useSelector(selectUserID);

  useEffect(() => {
    setLoading(true);

    const fetchUserMessages = async () => {
      const propertiesRef = collection(db, 'messages');

      const q = query(
        propertiesRef,
        orderBy('createdAt', 'desc'),
        where('userRef', '==', userId),
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

    fetchUserMessages();
  }, [userId]);

  if (loading) {
    return <Spinner />;
  }

  console.log(messages);
  return (
    <>
      <Container>
        <div className="flex flex-col items-center mt-10 mb-10">
          
          {messages.length > 0 && (
            <h1 className="text-lg font-bold mb-10">
              Messages: {messages?.length}
            </h1>
          )}

          {messages?.length === 0 && (
            <p className="text-center text-sm sm:text-base">
              You have no messages yet.
              <Link to="/explore" className="text-blue-500">
                Click here to see our properties.
              </Link>
            </p>
          )}
          
          <div className="flex flex-col items-center overflow-auto max-h-[600px]">
            {messages?.map((message) => (
              <Link to={`/messages/${message.id}`} key={message?.id}>
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
