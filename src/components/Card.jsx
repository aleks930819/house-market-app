import { MdOutlineAttachMoney, MdChair } from 'react-icons/md';
import { FaBath, FaParking } from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';
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
              {/* <ul className="text-xs mt-4  list-inside  leading-relaxed flex flex-col gap-5">
                <li className="flex flex-col sm:flex-row gap-2 items-center">
                  <MdOutlineAttachMoney className="text-lg" />
                  {item?.offer
                    ? item?.discountPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : item?.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {item?.type === 'rent' ? ' / Month' : ''}
                  {item?.offer ? <span className='bg-green-700 text-white roudned-sm py-[1.2px] px-[4px]'>Discount: ${item?.regularPrice - item.discountPrice}</span> : ''  }
                </li>
                <li className="flex gap-2 items-center">
                  <IoIosBed className="text-lg" />
                  {item?.bedrooms > 1
                    ? `${item?.bedrooms} Bedrooms`
                    : `${item?.bedrooms} Bedroom`}
                </li>
                <li className="flex gap-2 items-center">
                  <FaBath className="text-lg" />
                  {item?.bathrooms > 1
                    ? `${item?.bathrooms} Bathrooms`
                    : `${item?.bathrooms} Bathroom`}
                </li>
                <li className="flex gap-2 items-center">
                  <FaParking className="text-lg" />
                  {item?.parking ? 'Yes' : 'No'}
                </li>
                <li className="flex gap-2 items-center">
                  <MdChair className="text-lg" />
                  {item?.furnished ? 'Yes' : 'No'}
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
