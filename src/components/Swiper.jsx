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
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden ">
      <AiOutlineClose
        className=" absolute  top-[220px]  left-[10px]  md:top-[90px]  md:left-[155px] text-lg sm:text-2xl z-0 cursor-pointer  text-neutral-600"
        onClick={() => setShowSwipper()}
      />
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="
          w-[400px] h-[300px] sm:w-[70%] sm:h-[70%]
           flex justify-center items-center mt-10
        "
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
