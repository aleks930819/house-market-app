import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaBath, FaParking } from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';
import Button from './Button';

const CategoryListingItem = ({ data }) => {
  return (
    <>
      {data?.map((item) => (
        <div className="container mx-auto px-20 mt-10" key={item.id}>
          <div
            className="border bg-slate-200  rounded-lg p-6  relative z-10"
            style={{ cursor: 'auto' }}
          >
            <div className="flex flex-wrap items-center">
              <div className="flex w-full h-48 md:h-64 lg:h-72 relative">
                <div className="w-8/12 pr-4 relative">
                  <img
                    src={item?.imgUrls[0]}
                    className="w-full h-full object-cover object-top rounded-lg bg-white"
                  />
                </div>
                <div className="w-4/12 h-full">
                  <div className="flex flex-col w-full h-full">
                    <div className="flex-1 pb-2">
                      <div className="w-full h-full relative">
                        <img
                          src={item?.imgUrls[1]}
                          className="absolute top-0 w-full h-full object-cover object-center rounded-lg bg-white"
                        />
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="w-full h-full relative">
                        <img
                          src={item?.imgUrls[2]}
                          className="absolute top-0 w-full h-full object-cover object-bottom rounded-lg bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full pt-8 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-xs md:text-lg">{item?.name}</h2>

                  <p className="text-xs leading-relaxed ">{item?.location}</p>
                  <ul className="text-xs mt-4  list-inside  leading-relaxed flex flex-col gap-5">
                    <li className="flex gap-2 items-center">
                      <MdOutlineAttachMoney className="text-lg" />
                      {item?.offer
                        ? item?.discountPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : item?.regularPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      {item?.type === 'rent' ? ' / Month' : ''}
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
                  </ul>
                </div>
                <div className="w-full sm:flex-1  gap-4 pt-6 text-center">
                  <Button primary>Reserve</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryListingItem;
