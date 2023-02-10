import { where, orderBy, limit } from 'firebase/firestore';

import Spinner from '../components/Spinner';
import Container from '../components/Container';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserID } from '../slices/authSlice';
import useGetData from '../hooks/useGetData';

const Messages = () => {
  const userId = useSelector(selectUserID);

  const { data: messages, loading } = useGetData(
    'messages',
    orderBy('createdAt', 'desc'),
    where('userRef', '==', userId),
    limit(10)
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Container>
        <div className="flex flex-col items-center mt-10 mb-10">
          {messages?.length === 0 ? (
            <>
              <p className="text-center text-sm sm:text-base">
                You have no messages yet.
                <Link to="/explore" className="text-blue-500">
                  Click here to see our properties.
                </Link>
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center overflow-auto max-h-[600px]">
              <h1 className="text-lg font-bold mb-10">
                Messages: {messages?.length}
              </h1>

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
          )}
        </div>
      </Container>
    </>
  );
};

export default Messages;
