import Container from '../components/Container';
import Sell from '../assets/images/sell.jpg';
import Rent from '../assets/images/rent.jpg';

const data = [
  {
    id: 1,
    title: 'Sell',
    image: Sell,
  },
  {
    id: 2,
    title: 'Rent',
    image: Rent,
  },
];

const Explore = () => {
  return (
    <Container>
      <div className="flex flex-col w-3/4 gap-5 mx-auto sm:flex-row ">
        {data.map((item) => (
          <div
            className="relative sm:w-1/2 rounded-md overflow-hidden"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover brightness-80 md:cursor-pointer md:hover:scale-110 transition duration-300 ease-in-out "
            />
            <h3 className="absolute text-white text-md sm:text-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-2 bg-opacity-50 rounded-sm">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Explore;
