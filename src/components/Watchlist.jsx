import { Link } from 'react-router-dom';
import useGetWatchlistData from '../hooks/useGetWatchlistData';
import { Facilities } from './Facilities';
import Button from './Button';
import Row from './Row';

const Watchlist = (itemToDeleteId) => {
  const { watchlistData } = useGetWatchlistData();

  return (
    <div className="mb-10 ">
      <div>
        <h1 className="font-bold mt-5 sm:text-lg md:text-xl pb-5">Watchlist</h1>
      </div>
      <Row grid3>
        {watchlistData?.map((listing) => (
          <div
            className="border shadow-md p-5 flex flex-col gap-2 rounded-md cursor-pointer"
            key={listing?.id}
          >
            <div className="flex items-center gap-2">
              <img
                src={listing?.imgUrls[0]}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex flex-col pl-5">
                <h1 className="font-bold">{listing?.name}</h1>
                <Facilities listing={listing} key={listing?.id} />
              </div>
            </div>
            <div className="flex gap-1 pt-5">
              <Button success to={`/details/${listing?.id}`}>
                View
              </Button>
              <Button danger>Remove From Watchlist</Button>
            </div>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default Watchlist;
