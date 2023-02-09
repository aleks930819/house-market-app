import { Link } from 'react-router-dom';
import { Facilities } from './Facilities';

const Card = ({ item }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-2/3 overflow-hidden rounded-md shadow-xl text-xs  mb-5 cursor-pointer">
        <div className="w-full h-96">
          <Link to={`/details/${item.id}`}>
            <img
              src={item?.imgUrls[1]}
              className="w-full h-full object-cover md:hover:scale-110 transition duration-500 ease-in-out"
            />
          </Link>
        </div>
        <div className="pb-5">
          <div className="w-full pt-8 flex flex-col justify-between">
            <div className="p-5 sm:p-0">
              <h2 className="font-bold text-md md:text-lg">{item?.name}</h2>

              <p className="text-xs leading-relaxed ">{item?.location}</p>
              <Facilities listing={item} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
