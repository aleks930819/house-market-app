import Button from '../components/Button';

const data = [
  {
    id: 1,
    userPhoto:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    userName: 'John Doe',
    text: 'House Market actually helped me find the house of my dreams.',
    createdAt: '2021-08-01T00:00:00.000Z',
  },
  {
    id: 2,
    userPhoto:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    userName: 'Alex Doe',
    text: ' Using House Market has definitely saved us time and money.',
  },

  {
    id: 4,
    userPhoto:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    userName: 'Alexia Doe',
    text: 'I would recommend House Market for people who want to sell their home. It has saved me so much time!',
  },
];

const Testimonials = () => {
  return (
    <div className="flex justify-start items-center flex-col  h-screen mt-10 mb-10 p-5">
      <section className="text-gray-600 body-font overflow-scroll mt-[-40px]">
        {data.map((item) => (
          <div className="container px-5 py-12 mx-auto ">
            <div className="-my-8 divide-y-2 divide-gray-100">
              <div className=" flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="mt-4 text-gray-500 text-sm text-center">
                    12 jun 2020
                  </span>
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-base md:text-2xl font-medium text-gray-900 title-font mb-2">
                    {item.userName}
                  </h2>
                  <p className="">{item.text}</p>
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
