import { BsFillShieldFill } from 'react-icons/bs';
import { BiSupport } from 'react-icons/bi';
import { MdFreeCancellation } from 'react-icons/md';

const data = [
  {
    id: 1,
    icon: <BsFillShieldFill />,
    text: 'Protection with AirCover',
    desc: 'The most comprehensive protection in travel. Always included, always free.',
  },
  {
    id: 2,
    icon: <BiSupport />,
    text: '24/7 Support',
    desc: 'Our team is available 24/7 to help you with any questions or concerns.',
  },
  {
    id: 3,
    icon: <MdFreeCancellation />,
    text: 'Free Cancellation',
    desc: 'Cancellation options make it easy to re-book if your plans change.',
  },
];

const Features = () => {
  

  return (
    <div className="flex flex-col md:flex-row justify-center items-center pt-10 pb-10 border-t-2 w-4/5 mx-auto text-sm">
      {data.map((item) => (
        <div className="flex flex-col p-5 gap-5" key={item.id}>
          <div className="text-lg text-cyan-900">{item.icon}</div>
          <div>
            <h2 className="text pb-2 font-bold">{item.text}</h2>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
