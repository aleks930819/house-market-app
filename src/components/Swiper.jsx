import React, { useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { AiOutlineClose } from 'react-icons/ai';

import { Pagination } from 'swiper';

import '../index.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { useKeyDown } from '../hooks/useKeyDown';

const Swipper = ({ data, setShowSwipper, starterIndex }) => {
  useKeyDown(() => setShowSwipper(), ['Escape']);

  return (
    <div className="fixed w-full h-full  top-0 left-0  right-0 bottom-0 overflow-hidden bg-black bg-opacity-80">
      <AiOutlineClose
        className=" absolute  top-[100px]   md:top-[60px] left-[15px] text-lg sm:text-2xl z-50 cursor-pointer text-white bg-black bg-opacity-60 rounded-lg p-[1px]"
        onClick={() => setShowSwipper()}
      />
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
        initialSlide={starterIndex}
      >
        {data[0]?.imgUrls?.map((imgUrl, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url(${data[0]?.imgUrls[index]})`,
              }}
              className="w-full h-full bg-cover bg-center bg-no-repeat"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipper;
