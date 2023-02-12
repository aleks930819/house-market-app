import { useParams } from 'react-router-dom';

import { useState } from 'react';

import useGetDataById from '../hooks/useGetDataById';

import Button from './Button';
import Spinner from './Spinner';
import Swipper from './Swiper';
import { Facilities } from './Facilities';
import Contact from './Contact';
import Map from './Map';

const ItemDetails = () => {
  const [showSwipper, setShowSwipper] = useState(false);
  const [starterIndex, setStartedIndex] = useState(0);
  const [showContact, setShowContact] = useState(false);

  const { id } = useParams();

  const { data, loading } = useGetDataById('listings', id);

  if (loading) {
    return <Spinner />;
  }

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
    setShowContact(!showContact);
  };

  return (
    <>
      {data &&
        data?.map((item) => (
          <>
            <div
              className="container mx-auto px-20 mt-10 mb-10 min-h-screen z-0"
              key={item?.id}
            >
              <div
                className="border bg-slate-200  rounded-lg p-6  relative z-0"
                style={{ cursor: 'auto' }}
              >
                <div className="flex flex-wrap items-center">
                  <div className="flex w-full h-48 md:h-64 lg:h-72 relative">
                    <div className="w-8/12 pr-4 relative">
                      <img
                        src={item?.imgUrls[0]}
                        className="w-full h-full object-cover object-top rounded-lg bg-white cursor-pointer"
                        onClick={() => viewImageHandler(0)}
                      />
                    </div>
                    <div className="w-4/12 h-full">
                      <div className="flex flex-col w-full h-full">
                        <div className="flex-1 pb-2">
                          <div className="w-full h-full relative">
                            <img
                              src={item?.imgUrls[1]}
                              className="absolute top-0 w-full h-full object-cover object-center rounded-lg bg-white cursor-pointer"
                              onClick={() => viewImageHandler(1)}
                            />
                          </div>
                        </div>
                        <div className="flex-1 pt-2">
                          <div className="w-full h-full relative">
                            <img
                              src={item?.imgUrls[2]}
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
                      <h2 className="font-bold text-xs md:text-lg">
                        {item?.name}
                      </h2>

                      <p className="text-xs leading-relaxed ">
                        {item?.location}
                      </p>
                      <Facilities listing={item} />
                    </div>

                    {item?.latitude && item?.longitude && (
                      <Map
                        lat={item?.latitude}
                        lng={item?.longitude}
                        location={item?.location}
                      />
                    )}
                  </div>
                  <div className="w-full sm:flex-1  gap-4 pt-6 text-center">
                    <Button primary onClick={() => clickHandler()}>
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {showContact && (
                <Contact
                  subject={item?.name}
                  userRef={item?.userRef}
                  key={item?.id}
                />
              )}
            </div>
          </>
        ))}
    </>
  );
};

export default ItemDetails;
