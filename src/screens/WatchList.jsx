import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { doc, getDoc, updateDoc } from 'firebase/firestore';

import useGetWatchlistData from '../hooks/useGetWatchlistData';

import { db } from '../../firbase.config';

import { selectUserID } from '../slices/authSlice';

import { Facilities } from '../components/Facilities';

import Button from '../components/Button';
import Row from '../components/Row';

const Watchlist = () => {
  const { watchlistData } = useGetWatchlistData();
  const [filtredWatchlist, setFiltredWatchlist] = useState([]);
  const userID = useSelector(selectUserID);

  useEffect(() => {
    setFiltredWatchlist(watchlistData || []);
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
    <div className="flex flex-col justify-center items-center mx-auto h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">Watchlist</h1>
        <p className="text-gray-500">
          {filtredWatchlist?.length === 0
            ? 'Your watchlist is empty'
            : `You have ${filtredWatchlist?.length} items in your watchlist`}
        </p>
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
  );
};

export default Watchlist;
