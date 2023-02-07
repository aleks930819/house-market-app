import { MdOutlineAttachMoney, MdChair } from 'react-icons/md';
import { FaBath, FaParking } from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';

export const Facilities = ({ listing }) => {
    
  return (
    <ul className="text-xs mt-4  list-inside  leading-relaxed flex flex-col gap-5">
      <li className="flex flex-col sm:flex-row gap-2 items-center">
        <MdOutlineAttachMoney className="text-lg" />
        {listing?.offer
          ? listing?.discountPrice
              ?.toString()
              ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : listing?.regularPrice
              ?.toString()
              ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        {listing?.type === 'rent' ? ' / Month' : ''}
        {listing?.offer ? (
          <span className="bg-green-700 text-white roudned-sm py-[1.2px] px-[4px]">
            Discount: ${listing?.regularPrice - listing.discountPrice}
          </span>
        ) : (
          ''
        )}
      </li>
      <li className="flex gap-2 items-center">
        <IoIosBed className="text-lg" />
        {listing?.bedrooms > 1
          ? `${listing?.bedrooms} Bedrooms`
          : `${listing?.bedrooms} Bedroom`}
      </li>
      <li className="flex gap-2 items-center">
        <FaBath className="text-lg" />
        {listing?.bathrooms > 1
          ? `${listing?.bathrooms} Bathrooms`
          : `${listing?.bathrooms} Bathroom`}
      </li>
      <li className="flex gap-2 items-center">
        <FaParking className="text-lg" />
        {listing?.parking ? 'Yes' : 'No'}
      </li>
      <li className="flex gap-2 items-center">
        <MdChair className="text-lg" />
        {listing?.furnished ? 'Yes' : 'No'}
      </li>
    </ul>
  );
};