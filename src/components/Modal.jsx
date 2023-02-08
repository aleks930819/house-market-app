import ReactDOM from 'react-dom';

const Modal = ({ children, action }) => {
  return ReactDOM.createPortal(
    <div className="fixed w-full h-full  top-0 left-0  right-0 bottom-0 overflow-hidden bg-black bg-opacity-80">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div >{children}</div>
        <div className='flex justify-center items-center'>{action}</div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
