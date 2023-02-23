import Container from '../components/Container';
import { Link } from 'react-router-dom';
import Row from '../components/Row';


import { ExploreData as data } from '../data/data';




const Explore = () => {
  return (
    <Container>
      <Row flex>
        {data.map((item) => (
          <div
            className="relative sm:w-1/2 rounded-md overflow-hidden cursor-pointer"
            key={item.id}
          >
            <Link to={item.link}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover brightness-50 md:cursor-pointer md:hover:scale-110 transition duration-300 ease-in-out "
              />
            </Link>
            <h3 className="absolute  text-white text-md sm:text-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              {item.title}
            </h3>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default Explore;
