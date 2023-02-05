import HouseImage from '../assets/images/house.jpg';

const Banner = () => {
  return (
    <div className="">
      <div className="w-full h-96 relative">
        <img
          src={HouseImage}
          alt="house image"
          className="w-full h-full object-cover  absolute brightness-50"
        />
        <div className="">
          <h3 className='text-white absolute  text-sm md:text-3xl  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">'>
            Discover Your New Home
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;
