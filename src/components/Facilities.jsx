import { MdOutlineAttachMoney, MdChair } from 'react-icons/md';
import { FaBath, FaParking } from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';

import ConvertPrice from '../utils/ConvertPrice';

export const Facilities = ({ listing }) => {
  const {
    offer,
    discountPrice,
    regularPrice,
    type,
    bedrooms,
    bathrooms,
    parking,
    furnished,
  } = listing;

  return (
    <ul className="text-xs mt-4  list-inside  leading-relaxed flex flex-col gap-5">
      <li className="flex sm:flex-row gap-2 items-center">
        <MdOutlineAttachMoney className="text-lg" />
        {offer ? ConvertPrice(discountPrice) : ConvertPrice(regularPrice)}
        {type === 'rent' ? ' / Month' : ''}
        {type === 'stay' ? ' / Night' : ''}

        {offer && (
          <span className="bg-green-700 text-white roudned-sm py-[1.2px] px-[4px]">
            Discount: ${ConvertPrice(regularPrice - discountPrice)}
          </span>
        )}
      </li>
      <li className="flex gap-2 items-center">
        <IoIosBed className="text-lg" />
        {`${bedrooms} Bedroom${bedrooms > 1 ? 's' : ''}`}
      </li>
      <li className="flex gap-2 items-center">
        <FaBath className="text-lg" />
        {`${bathrooms} Bathroom${bathrooms > 1 ? 's' : ''}`}
      </li>
      <li className="flex gap-2 items-center">
        <FaParking className="text-lg" />
        {parking ? 'Yes' : 'No'}
      </li>
      <li className="flex gap-2 items-center">
        <MdChair className="text-lg" />
        {furnished ? 'Yes' : 'No'}
      </li>
    </ul>
  );
};
