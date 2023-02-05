const Card = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-2/3 overflow-hidden rounded-md shadow-xl text-sm gap-5 mb-5 cursor-pointer">
        <div>
          <img
            src="https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            className="w-full h-full object-cover md:hover:scale-110 transition duration-500 ease-in-out"
          />
        </div>
        <div className="pb-5">
          <h2>THe Residences at NewCity</h2>
          <p>1457 N halstet St, Chicago </p>
          <div>
            <p>Studio - 2 Beds | $2,052 - 5,023</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-2/3 overflow-hidden rounded-md shadow-xl text-sm gap-5 mb-5">
        <div>
          <img
            src="https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pb-5">
          <h2>THe Residences at NewCity</h2>
          <p>1457 N halstet St, Chicago </p>
          <div>
            <p>Studio - 2 Beds | $2,052 - 5,023</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-2/3 overflow-hidden rounded-md shadow-xl text-sm gap-5 mb-5">
        <div>
          <img
            src="https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="pb-5">
          <h2>THe Residences at NewCity</h2>
          <p>1457 N halstet St, Chicago </p>
          <div>
            <p>Studio - 2 Beds | $2,052 - 5,023</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
