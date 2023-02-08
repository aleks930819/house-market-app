import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { AiFillMessage } from 'react-icons/ai';

import { getAuth, updateProfile } from 'firebase/auth';
import {
  updateDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../../firbase.config';

import Spinner from '../components/Spinner';
import Container from '../components/Container';
import Button from '../components/Button';

import DefaultProfilePhoto from '../assets/images/profile.jpg';
import { Facilities } from '../components/Facilities';

const Profile = () => {
  const auth = getAuth();

  const userId = auth.currentUser.uid;

  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [activeFilterButton, setActiveFilterButton] = useState('all');

  useEffect(() => {
    setLoading(true);

    const fetchUserListings = async () => {
      const propertiesRef = collection(db, 'listings');

      const q = query(propertiesRef, where('userRef', '==', userId));

      const querySnapshot = await getDocs(q);

      const properties = [];

      querySnapshot.forEach((doc) => {
        properties.push({ id: doc.id, ...doc.data() });
      });

      setProperties(properties);
      setFilteredProperties(properties);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  if (loading) {
    return <Spinner />;
  }

  const onDeleteHandler = async (id) => {
    try {
      await deleteDoc(doc(db, 'listings', id));
      toast.success('Listing deleted successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }

    const newListings = properties.filter((listing) => listing.id !== id);
    setProperties(newListings);
  };

  const filterProperties = (type) => {
    setActiveFilterButton(type);
    if (type === 'all') {
      setFilteredProperties(properties);
      return;
    }

    const filtered = properties.filter((property) => property.type === type);
    setFilteredProperties(filtered);
  };

  const buttonsType = ['sale', 'rent', 'all'];

  return (
    <>
      <Container>
        <div className="mt-10 text-xs sm:text-md  border shadow-md p-5 flex flex-col gap-2 rounded-md ">
          <div className="grid grid-cols-2 place-items-center">
            <div className="w-16 h-16">
              <img
                src={auth.currentUser.photoURL || DefaultProfilePhoto}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <AiFillMessage className="text-2xl place-items-center text-cyan-900" />
              <h2>My Messages</h2>
            </div>
          </div>

          <div className="flex flex-col items-center mt-5">
            <h1 className="text-sm font-bold">
              {auth.currentUser.displayName}
            </h1>
            <p>{auth.currentUser.email}</p>
          </div>
          <div className="flex  gap-2 mt-5">
            <Button to={`/edit/${userId}`} primary>
              Edit Profile
            </Button>
            <Button danger>Delete Profile</Button>
          </div>
        </div>

        <div className="mb-10">
          <div className="">
            <h1 className="font-bold mt-5 sm:text-lg md:text-xl pb-5">
              My Properties
            </h1>
            <div className="flex gap-1">
              {buttonsType.map((type) => (
                <Button
                  onClick={() => filterProperties(type)}
                  success={activeFilterButton === type}
                >
                  {type[0].toUpperCase() + type.slice(1) + 's' || 'All'}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {filteredProperties?.map((listing) => (
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
                  <Button danger onClick={() => onDeleteHandler(listing?.id)}>
                    Delete
                  </Button>
                  <Button success={true} to={`/edit-properties/${listing?.id}`}>
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
