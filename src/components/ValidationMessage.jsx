const ValidationMessage = ({ message }) => {
  return (
    <div className="text-xs sm:text-base text-red-500 text-center pb-2">
      {message}
    </div>
  );
};

export default ValidationMessage;
