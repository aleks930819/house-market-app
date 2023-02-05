import Button from './Button';
import Card from './Card';

const ExploreSection = () => {
  return (
    <div className="mb-10">
      <h2 className="pt-10  text-center md:text-lg">Explore Rentals</h2>
      <div className="flex flex-col justify-center items-center mt-10 md:flex-row gap-5 sm:pl-5 sm:pr-5  lg:w-3/4 mx-auto ">
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex justify-center items-center">
        <Button primary roundedSmall>
          View More
        </Button>
      </div>
    </div>
  );
};

export default ExploreSection;
