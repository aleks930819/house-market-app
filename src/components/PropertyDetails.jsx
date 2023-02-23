import useGetDataById from '../hooks/useGetDataById';
import { Facilities } from './Facilities';

const PropertyDetails = ({ listingId }) => {
  const { data: listingDetails } = useGetDataById('listings', listingId || '');

  return (
    <>
      <div>
        <h1 className="font-bold text-base sm:text-lg mt-10">
          Property Details
        </h1>
      </div>

      <div className="border shadow-md p-5 flex flex-col gap-2 rounded-md cursor-pointer mb-10 mt-5">
        {listingDetails?.map((listing) => {
          return (
            <div key={listing.id}>
              <div className="flex items-center gap-2">
                <img
                  src={listing?.imgUrls[0]}
                  className="w-16 h-16 object-cover rounded-md"
                  alt={listing?.name}
                />
                <div className="flex flex-col pl-5">
                  <h1 className="font-bold">{listing?.name}</h1>
                  <Facilities listing={listing} key={listing?.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PropertyDetails;
