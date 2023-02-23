import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { doc, getDoc, updateDoc } from 'firebase/firestore';

import useGetWatchlistData from '../hooks/useGetWatchlistData';

import { db } from '../../firbase.config';

import { selectUserID } from '../slices/authSlice';

import { Facilities } from './Facilities';
import Button from './Button';
import Row from './Row';

const Watchlist = () => {
  const { watchlistData } = useGetWatchlistData();
  const [filtredWatchlist, setFiltredWatchlist] = useState([]);
  const userID = useSelector(selectUserID);

  console.log(watchlistData);

  useEffect(() => {
    setFiltredWatchlist(watchlistData);
  }, [watchlistData]);

  const deleteItem = async (itemToDeleteId) => {
    try {
      const userRef = doc(db, 'users', userID);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const watchlist = userDoc.data().watchlist;
        const newWatchlist = watchlist.filter(
          (item) => item.id !== itemToDeleteId
        );
        await updateDoc(userRef, {
          watchlist: newWatchlist,
        });
      }
      setFiltredWatchlist(
        filtredWatchlist.filter((item) => item.id !== itemToDeleteId)
      );
      toast.success('Item removed from watchlist');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    filtredWatchlist.length !== 0 && (
      <div className="mb-10  flex justify-start items-start flex-col">
        <div>
          <h1 className="font-bold mt-5 sm:text-lg md:text-xl pb-5">
            Watchlist
          </h1>
        </div>
        <Row grid3>
          {filtredWatchlist?.map((listing) => (
            <div
              className="border shadow-md p-5 flex flex-col gap-2 rounded-md cursor-pointer"
              key={listing?.id}
            >
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
              <div className="flex gap-1 pt-5">
                <Button success to={`/details/${listing?.id}`}>
                  View
                </Button>
                <Button danger onClick={() => deleteItem(listing?.id)}>
                  Remove From Watchlist
                </Button>
              </div>
            </div>
          ))}
        </Row>
      </div>
    )
  );
};

export default Watchlist;
