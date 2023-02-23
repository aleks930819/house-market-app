import Button from './Button';
import Card from './Card';

import { where, orderBy, limit } from 'firebase/firestore';

import useGetData from '../hooks/useGetData';
import Row from './Row';
import { useEffect } from 'react';

const ExploreRentals = () => {
  const { data: listings, getData } = useGetData(
    'listings',
    orderBy('timestamp', 'desc'),
    where('type', '==', 'rent'),
    limit(3)
  );

  useEffect(() => {
    if (!listings) {
      getData();
    }
  }, [getData, listings]);

  return (
    <div className="mb-10">
      <h2 className="pt-10 pb-10 text-center md:text-lg">Explore Rentals</h2>

      <Row flex>
        {listings?.map((item) => (
          <Card key={item?.id} item={item} />
        ))}
      </Row>
      <div className="flex justify-center items-center">
        <Button primary roundedSmall to="/category/rent">
          View More
        </Button>
      </div>
    </div>
  );
};

export default ExploreRentals;
