import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination, Navigation } from 'swiper';

import '..//index.css';
import Button from './Button';

const data = [
  {
    id: 1,
    userPhoto:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    userName: 'John Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
  },
  {
    id: 2,
    userPhoto:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    userName: 'Alex Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
  },
  {
    id: 3,
    userPhoto:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    userName: 'Alexia Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
  },
  {
    id: 4,
    userPhoto:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    userName: 'Alexia Doe',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
  },
];

const Testimonials = () => {
  return (
    <div className="flex justify-center items-center  flex-col mt-10 mb-10">
      <h2 className="text-xl font-bold">What our Users Say</h2>

      <>
        <Swiper
          navigation={true}
          modules={[Pagination, Navigation]}
          className="
              w-full
           sm:w-1/2
           sm:h-1/2
           mb-5
          "
        >
          {data.map((item) => (
            <SwiperSlide
              className="flex justify-center items-center  flex-col p-8 text-center  border-gray-200 md:p-12"
              key={item?.id}
            
                   
              
              
            >
              <figure className="w-full h-auto mx-auto">
                <blockquote>
                  <p className="text-base font-medium  text-neutral-600">
                    {item?.text}
                  </p>
                </blockquote>
                <figcaption className="flex items-center justify-center mt-10 space-x-3 w-full h-full mx-auto ">
                  <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                    <div className="pr-3 text-sm  text-neutral-600 ">
                      {item?.userName}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button primary to="/testimonials">See More</Button>
      </>
    </div>
  );
};

export default Testimonials;
