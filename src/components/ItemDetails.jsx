import { MdOutlineAttachMoney, MdChair } from 'react-icons/md';
import { FaBath, FaParking } from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';

import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { getDoc, doc } from 'firebase/firestore';

import { db } from '../../firbase.config';

import Button from './Button';
import Spinner from './Spinner';
import Swipper from './Swiper';
import { Facilities } from './Facilities';
import Contact from './Contact';
import Booking from '../screens/Booking';

const ItemDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSwipper, setShowSwipper] = useState(false);
  const [starterIndex, setStartedIndex] = useState(0);
  const [showContact, setShowContact] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const docRef = doc(db, 'listings', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());

        setLoading(false);
      } else {
        navigate('/404');
        setLoading(false);
      }
    };

    getData();
  }, [id, navigate]);

  if (loading) {
    return <Spinner />;
  }

  const lat = data?.latitude ?? '';
  const lng = data?.longitude ?? '';

  const viewImageHandler = (starterIndex) => {
    setShowSwipper(!showSwipper);
    setStartedIndex(starterIndex);
  };

  if (showSwipper) {
    return (
      <Swipper
        data={data}
        setShowSwipper={setShowSwipper}
        starterIndex={starterIndex}
      />
    );
  }

  const clickHandler = (type) => {
    setShowContact(true);
  };

  return (
    <>
      <div className="container mx-auto px-20 mt-10 mb-10 min-h-screen">
        <div
          className="border bg-slate-200  rounded-lg p-6  relative z-10"
          style={{ cursor: 'auto' }}
        >
          <div className="flex flex-wrap items-center">
            <div className="flex w-full h-48 md:h-64 lg:h-72 relative">
              <div className="w-8/12 pr-4 relative">
                <img
                  src={data?.imgUrls[0]}
                  className="w-full h-full object-cover object-top rounded-lg bg-white cursor-pointer"
                  onClick={() => viewImageHandler(0)}
                />
              </div>
              <div className="w-4/12 h-full">
                <div className="flex flex-col w-full h-full">
                  <div className="flex-1 pb-2">
                    <div className="w-full h-full relative">
                      <img
                        src={data?.imgUrls[1]}
                        className="absolute top-0 w-full h-full object-cover object-center rounded-lg bg-white cursor-pointer"
                        onClick={() => viewImageHandler(1)}
                      />
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="w-full h-full relative">
                      <img
                        src={data?.imgUrls[2]}
                        className="absolute top-0 w-full h-full object-cover object-bottom rounded-lg bg-white cursor-pointer"
                        onClick={() => viewImageHandler(2)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full pt-8 flex flex-col justify-between sm:flex-row">
              <div>
                <h2 className="font-bold text-xs md:text-lg">{data?.name}</h2>

                <p className="text-xs leading-relaxed ">{data?.location}</p>
                <Facilities listing={data} />
              </div>

              {data?.latitude && data?.longitude && (
                <div className="w-full h-[200px] overflow-hidden  mt-10 sm:w-[500px] md:w-[800px]">
                  <MapContainer
                    style={{ height: '100%', width: '100%' }}
                    center={[lat, lng]}
                    zoom={13}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                    />
                    <Marker position={[lat, lng]}>
                      <Popup>{data?.location}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              )}

              {/* <div className='hidden md:block'>
                <Booking />
              </div> */}
            </div>
            <div className="w-full sm:flex-1  gap-4 pt-6 text-center">
              <Button primary onClick={() => clickHandler(data?.type)}>
                Contact
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="md:hidden mt-10">
          <Booking />
        </div> */}
      </div>

      {showContact && <Contact />}
    </>
  );
};

export default ItemDetails;
