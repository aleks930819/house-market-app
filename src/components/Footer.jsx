const data = [
  {
    id: 1,
    text: '&#169; 2023 All rights reserved',
  },
  {
    id: 2,
    text: 'Privacy Policy',
  },
  {
    id: 3,
    text: 'Terms of Service',
  },
  {
    id: 4,
    text: 'Contact Us',
  },
];

const Footer = () => {
  return (
    <footer className="pt-10 pb-10 border-t-2">
      <ul className="flex flex-col justify-center items-center text-center gap-2 sm:flex-row sm:gap-5 sm:justify-start sm:pl-10 text-xs">
        {data.map((item) => (
          <li key={item.id}>
            <p dangerouslySetInnerHTML={{ __html: item.text }} />
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
