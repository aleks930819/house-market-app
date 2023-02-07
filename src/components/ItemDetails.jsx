import { MdOutlineAttachMoney, MdChair } from 'react-icons/md';
import { FaBath, FaParking } from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';

import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { getDoc, doc } from 'firebase/firestore';

import { db } from '../../firbase.config';

import Button from './Button';
import Modal from './Modal';
import Spinner from './Spinner';
import Swipper from './Swiper';

const ItemDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSwipper, setShowSwipper] = useState(false);

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
    return (
      <Modal>
        <Spinner />
      </Modal>
    );
  }

  const lat = data?.latitude ?? '';
  const lng = data?.longitude ?? '';

  const viewImageHandler = () => {
    setShowSwipper(!showSwipper);
  };

  if (showSwipper) {
    return <Swipper data={data} setShowSwipper={setShowSwipper} />;
  }

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
                  onClick={() => viewImageHandler()}
                />
              </div>
              <div className="w-4/12 h-full">
                <div className="flex flex-col w-full h-full">
                  <div className="flex-1 pb-2">
                    <div className="w-full h-full relative">
                      <img
                        src={data?.imgUrls[1]}
                        className="absolute top-0 w-full h-full object-cover object-center rounded-lg bg-white cursor-pointer"
                        onClick={() => viewImageHandler()}
                      />
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="w-full h-full relative">
                      <img
                        src={data?.imgUrls[2]}
                        className="absolute top-0 w-full h-full object-cover object-bottom rounded-lg bg-white cursor-pointer"
                        onClick={() => viewImageHandler()}
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
                <ul className="text-xs mt-4  list-inside  leading-relaxed flex flex-col gap-5">
                  <li className="flex flex-col sm:flex-row gap-2 items-center">
                    <MdOutlineAttachMoney className="text-lg" />
                    {data?.offer
                      ? data?.discountPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : data?.regularPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    {data?.type === 'rent' ? ' / Month' : ''}
                    {data?.offer ? (
                      <span className="bg-green-700 text-white roudned-sm py-[1.2px] px-[4px]">
                        Discount: ${data?.regularPrice - data.discountPrice}
                      </span>
                    ) : (
                      ''
                    )}
                  </li>
                  <li className="flex gap-2 items-center">
                    <IoIosBed className="text-lg" />
                    {data?.bedrooms > 1
                      ? `${data?.bedrooms} Bedrooms`
                      : `${data?.bedrooms} Bedroom`}
                  </li>
                  <li className="flex gap-2 items-center">
                    <FaBath className="text-lg" />
                    {data?.bathrooms > 1
                      ? `${data?.bathrooms} Bathrooms`
                      : `${data?.bathrooms} Bathroom`}
                  </li>
                  <li className="flex gap-2 items-center">
                    <FaParking className="text-lg" />
                    {data?.parking ? 'Yes' : 'No'}
                  </li>
                  <li className="flex gap-2 items-center">
                    <MdChair className="text-lg" />
                    {data?.furnished ? 'Yes' : 'No'}
                  </li>
                </ul>
              </div>
              {data?.latitude && data?.longitude && (
                <div className="w-full h-[200px] overflow-hidden  mt-10 sm:w-[500px]">
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
            </div>
            <div className="w-full sm:flex-1  gap-4 pt-6 text-center">
              <Button primary>
                {data?.type === 'rent' ? 'Reserve' : 'Contact'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
