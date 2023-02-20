import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
const ShowMessage = ({ messageData, setShowModal,id }) => {
  const [reply, setReply] = useState('');


  const action = (
    <div className="flex gap-2">
      <Button roundedSmall success onClick={() => {}}>
        Reply
      </Button>
      <Button roundedSmall danger onClick={() => setShowModal(false)}>
        Close
      </Button>
    </div>
  );

  const changeHandler = (e) => {
    setReply(e.target.value);
  };

  setShowModal(true);
  const message = messageData.filter((message) => message.id === id);

  console.log(message);

  return (
    <Modal action={action}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white pb-2">Name:</h1>
        </div>
        <div className="flex flex-col gap-2 pb-10">
          <p className="text-lg text-white">Message:</p>
          <p className="text-md text-white whitespace-pre-line">
            test stgsts tsetg setstg stgsetg
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
};

export default ShowMessage;
