import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const SubscriptionSudjection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-base sm:text-2xl font-semibold mb-5">
        Upgrade your plan to add a property
      </h1>
      <Button onClick={() => navigate('/subscription')}>Upgrade</Button>
    </div>
  );
};

export default SubscriptionSudjection;
