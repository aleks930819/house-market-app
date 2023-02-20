import { Link } from 'react-router-dom';
import Button from './Button';
const AddPropertySuggestion = () => {
  return (
    <div className="flex flex-col items-center mt-10 mb-10">
      <h2 className="text-sm sm:text-base font-bold text-black">
        You haven't got any property.
      </h2>
      <Link to="/host">
        <Button roundedSmall  primary className="mt-5">
          Add Property
        </Button>
      </Link>
    </div>
  );
};

export default AddPropertySuggestion;
