import { useEffect, useState } from 'react';

import Button from './Button';
import { Facilities } from './Facilities';
import Row from './Row';
import useGetData from '../hooks/useGetData';
import { orderBy, where, limit } from 'firebase/firestore';
import { db } from '../../firbase.config';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserID } from '../slices/authSlice';
import Modal from './Modal';
import { SET_LISTING } from '../slices/listingSlice';

const MyProperties = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const userId = useSelector(selectUserID);
  const dispatch = useDispatch();

  const {
    data: properties,
    fetchMoreData,
    getData,
  } = useGetData(
    'listings',
    orderBy('timestamp', 'desc'),
    where('userRef', '==', userId),
    limit(10)
  );

  useEffect(() => {
    if (!properties) {
      getData();
    }
   
  }, [getData, properties, dispatch]);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const onDeleteHandler = async () => {
    try {
      await deleteDoc(doc(db, 'listings', itemToDeleteId));
      toast.success('Listing deleted successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }

    const newFielteredProperties = filteredProperties.filter(
      (listing) => listing.id !== itemToDeleteId
    );

    setFilteredProperties(newFielteredProperties);
    setShowModal(false);
  };

  const handleModalView = () => {
    setShowModal(!showModal);
  };

  const action = (
    <div className="flex gap-2">
      <Button rounded success onClick={onDeleteHandler}>
        YES
      </Button>
      <Button rounded danger onClick={handleModalView}>
        NO
      </Button>
    </div>
  );

  const modal = (
    <Modal action={action}>
      <h2 className="text-white text-sm pb-5 sm:text-lg w-[400px] text-center md:w-[500px]">
        Are you sure you want to delete it?
      </h2>
    </Modal>
  );

  const [activeFilterButton, setActiveFilterButton] = useState('all');

  const buttonsType = ['sale', 'rent', 'stay', 'all'];

  const handleFilterButtonClick = (type) => {
    setActiveFilterButton(type);

    if (type === 'all') {
      return setFilteredProperties(properties);
    }

    const filtered = properties.filter((property) => property.type === type);
    setFilteredProperties(filtered);
  };

  return (
    <div className="mb-10">
      <div>
        <h1 className="font-bold mt-5 sm:text-lg md:text-xl pb-5">
          My Properties
        </h1>
        <div className="flex gap-1">
          {buttonsType.map((type) => (
            <Button
              onClick={() => handleFilterButtonClick(type)}
              success={activeFilterButton === type}
              key={type}
            >
              {type[0].toUpperCase() + type.slice(1) || 'All'}
            </Button>
          ))}
        </div>
      </div>

      <Row grid3>
        {filteredProperties?.map((listing) => (
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
              <Button success to={`/edit-properties/${listing?.id}`}>
                Edit
              </Button>
              <Button
                danger
                onClick={() => {
                  handleModalView();
                  setItemToDeleteId(listing?.id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </Row>
      {showModal && modal}
      {properties?.length >= 10 && (
        <div className="flex justify-center">
          <Button
            rounded
            success
            onClick={fetchMoreData}
            className="mt-5"
            disabled={properties.length < 1}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyProperties;
