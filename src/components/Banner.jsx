import HouseImage from '../assets/images/house.jpg';

const Banner = () => {
  return (
    <div className="hidden sm:block">
      <div className="w-ful h-96 md:h-60 relative z-0">
        <img
          src={HouseImage}
          alt="house image"
          className="w-full h-full  z-0 object-cover md:object-center absolute brightness-50"
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
