import Button from '../components/Button';
import { useEffect } from 'react';
import { orderBy, where, limit } from 'firebase/firestore/lite';
import useGetData from '../hooks/useGetData';

const Testimonials = () => {
  const {
    data: testimonials,
    loading,
    fetchMoreData,
    getData,
  } = useGetData(
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
    <div className="flex justify-between items-center flex-col  h-screen mt-10 mb-10 p-5 ">
      <section className="text-gray-600 body-font overflow-scroll mt-[-40px]">
        {testimonials?.map((item) => (
          <div className="container px-5 py-12 mx-auto ">
            <div className="-my-8 divide-y-2 divide-gray-100">
              <div className=" flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="mt-4 text-gray-500 text-sm text-center">
                    {item?.createdAt}
                  </span>
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-base md:text-2xl font-medium text-gray-900 title-font mb-2">
                    {item?.userName}
                  </h2>
                  <p className="">{item?.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="mt-[50px] flex gap-2">
        <Button primary>Add Testimonial</Button>
        <Button primary>Load More</Button>
      </div>
    </div>
  );
};

export default Testimonials;
