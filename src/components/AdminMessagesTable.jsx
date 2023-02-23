import Button from './Button';
import Table from './Table';
import { toast } from 'react-toastify';
import { db } from '../../firbase.config';
import { deleteDoc, doc } from 'firebase/firestore';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import Input from './Input';

import { addDoc, collection } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUserID } from '../slices/authSlice';

const AdminMessagesTable = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [reply, setReply] = useState('');
  const [senderId, setSenderId] = useState('');

  const userId = useSelector(selectUserID);

  useEffect(() => {
    setMessagesData(data);
  }, [data]);

  const saveSenderID = (id) => {
    setSenderId(id);
  };

  const deleteHandler = async (id) => {
    try {
      await deleteDoc(doc(db, 'contact-us', id));
      toast.success('Message deleted successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const replyHandler = async (e) => {
    e.preventDefault();

    if (reply === '') {
      toast.error('Please enter a message');
      return;
    }

    try {
      await addDoc(collection(db, 'messages'), {
        text: reply,
        createdAt: new Date(),
        lastMessage: '',
        senderId: userId,
        subject: 'Response to your message',
        name: 'Admin',
        listingId: '',
        userRef: senderId,
      });

      setMessage('');
      setReply('');
      setShowModal(false);

      toast.success('Message sent successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const action = (
    <div className="flex gap-2">
      <Button roundedSmall success onClick={replyHandler}>
        Reply
      </Button>
      <Button roundedSmall danger onClick={() => setShowModal(false)}>
        Close
      </Button>
    </div>
  );

  const filterMessage = (id) => {
    const filteredMessage = messagesData.filter((message) => message.id === id);
    setMessage(filteredMessage);
  };

  const changeHandler = (e) => {
    setReply(e.target.value);
  };

  const modal = (
    <Modal action={action}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold text-white pb-2">
            Name: {message[0]?.name}
          </h1>
        </div>
        <div className="flex flex-col gap-2 pb-10">
          <p className="text-md text-white whitespace-pre-line">
            Message: {message[0]?.text}
          </p>
        </div>
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
      </div>
    </Modal>
  );

  const config = [
    {
      label: 'Name',
      render: (row) => row.name,
    },

    {
      label: 'Read',
      render: (row) => (
        <Button
          success
          onClick={() => {
            setShowModal(true);
            filterMessage(row.id);
            saveSenderID(row.from);
          }}
        >
          Read
        </Button>
      ),
    },

    {
      label: 'Delete',
      render: (row) => (
        <Button danger onClick={() => deleteHandler(row.id)}>
          Delete
        </Button>
      ),
    },
  ];



  return (
    <>
        {messagesData.length > 0 ? (
          <Table data={messagesData} config={config} />
        ) : (
          <h1 className="flex justify-center items-center text-xl mt-10 ">
            No messages
          </h1>
        )}
      {showModal && modal}
    </>
  );
};

export default AdminMessagesTable;
