import Button from './Button';
import Card from './Card';

import { where, orderBy, limit } from 'firebase/firestore';

import useGetData from '../hooks/useGetData';

const ExploreSection = () => {
  const { data: listings } = useGetData(
    'listings',
    orderBy('timestamp', 'desc'),
    where('type', '==', 'rent'),
    limit(3)
  );

  return (
    <div className="mb-10">
      <h2 className="pt-10  text-center md:text-lg">Explore Rentals</h2>
      <div className="flex flex-col justify-center items-center mt-10 md:flex-row gap-5 sm:pl-5 sm:pr-5  lg:w-3/4 mx-auto ">
        {listings?.map((item) => (
          <Card key={item?.id} item={item} />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Button primary roundedSmall to="/category/rent">
          View More
        </Button>
      </div>
    </div>
  );
};

export default ExploreSection;
