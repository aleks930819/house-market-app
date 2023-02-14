import { Link } from 'react-router-dom';
import { FooterData as data } from '../data/data';

const Footer = () => {
  return (
    <footer className="pt-10 pb-10 border-t-4 bg-slate-200 mt-auto ">
      <ul className="flex flex-col justify-center items-center text-center gap-2 sm:flex-row sm:gap-5 sm:justify-start sm:pl-10 text-xs">
        {data.map((item) => (
          <li key={item.id}>
            <Link to={item.link}>
              <p dangerouslySetInnerHTML={{ __html: item.text }} />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
