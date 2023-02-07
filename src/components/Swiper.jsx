import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { AiOutlineClose } from 'react-icons/ai';

import 'swiper/css';
import 'swiper/css/navigation';

import '../index.css';

import { Pagination } from 'swiper';

import 'swiper/css';

const Swipper = ({ data, setShowSwipper }) => {
  return (
    <div className="fixed w-full h-full  top-0 left-0  right-0 bottom-0 overflow-hidden bg-black bg-opacity-80">
      <AiOutlineClose
        className="  absolute top-[160px]  md:top-[60px] left-[15px] text-lg sm:text-2xl z-50 cursor-pointer text-white bg-black bg-opacity-60 rounded-lg"
        onClick={() => setShowSwipper()}
      />
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {data.imgUrls.map((imgUrl, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                backgroundImage: `url(${data.imgUrls[index]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="h-[400px] w-[400px] sm:w-[600px] sm:h-[600px] md:w-full md:h-full  relative"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipper;
