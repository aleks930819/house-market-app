import Laptop from '../assets/images/laptop.jpg';
import Couple from '../assets/images/couple-rent.jpg';
import Apartments from '../assets/images/apartments.jpg';
import OnlineShoping from '../assets/images/online-shoping.jpg';

const data = [
  {
    id: 1,
    image: Laptop,
    title: 'Renting Made Simple',
    description:
      'Browse the highest quality listings, apply online, sign your lease, and even pay your rent from any device.',
  },
  {
    id: 2,
    image: Couple,
    title: 'Tips for Renters',
    description:
      'Find answers to all of your renting questions with the best renter’s guide in the galaxy.',
  },
  {
    id: 3,
    image: Apartments,
    title: 'Advertise Your Rental',
    description:
      'Advertise Your Rental Connect with more than 75 million renters looking for new homes using our comprehensive marketing platform.',
  },

  {
    id: 4,
    image: OnlineShoping,
    title: 'Lease 100% Online',
    description:
      'Accept applications, process rent payments online, and sign digital leases all powered on a single platform',
  },
];

const StarterScreenWidget = () => {
  return (
    <div className="w-full max-w-5xl p-5 pb-10 mx-auto mb-10  grid grid-cols-1 text-xs gap-5 sm:grid-cols-2 sm:gap-0">
      {data?.map((item) => (
        <div className="relative" key={item?.id}>
          <img
            src={item?.image}
            alt={item?.title}
            className="w-full h-96 object-cover brightness-50"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black bg-opacity-60 p-5">
            <h2 className="font-bold pb-2">{item?.title}</h2>
            <p className="leading-5">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StarterScreenWidget;
