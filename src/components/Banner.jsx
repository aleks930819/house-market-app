import HouseImage from '../assets/images/house.jpg';

const Banner = () => {
  return (
    <div
      className="w-full bg-cover bg-center"
      style={{
        height: '32rem',
        backgroundImage: `url(${HouseImage})`,
      }}
    >
      <div className="flex items-center justify-center h-full w-full bg-black bg-opacity-50">
        <div className="text-center">
          <h1 className="text-white text-base font-semibold uppercase md:text-3xl">
            Discover Your New Home
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
