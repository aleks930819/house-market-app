import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { orderBy, where, limit } from 'firebase/firestore';

import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination, Navigation } from 'swiper';

import '../index.css';
import Button from './Button';
import useGetData from '../hooks/useGetData';

const Testimonials = () => {
  const { data: testimonials, getData } = useGetData(
    'testimonials',
    orderBy('createdAt', 'desc'),
    where('isApproved', '==', true),
    limit(3)
  );

  useEffect(() => {
    if (!testimonials) {
      getData();
    }
  }, [testimonials, getData]);

  return (
    <div className="flex justify-center items-center  flex-col mt-10 mb-10">
      <h2 className="text-xl font-bold">What our Users Say</h2>

      <>
        <Swiper
          navigation={true}
          modules={[Pagination, Navigation]}
          className="
              w-full
           sm:w-3/4
           sm:h-3/4
           mb-5
          "
        >
          {testimonials?.map((item) => (
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
        <Button primary to="/testimonials">
          See More
        </Button>
      </>
    </div>
  );
};

export default Testimonials;
