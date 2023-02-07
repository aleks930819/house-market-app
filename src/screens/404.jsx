import Container from '../components/Container';
import Button from '../components/Button';
import NotFoundImage from '../assets/images/notfound.jpg';

const NotFound = () => {
  return (
    <Container>
      <div className="flex flex-col gap-1 justify-center items-center">
        <img src={NotFoundImage} alt="Not Found" className="w-3/4" />
      </div>
    </Container>
  );
};
export default NotFound;
