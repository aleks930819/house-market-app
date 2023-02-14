import Container from '../components/Container';

const PrivacyPolicy = () => {
  return (
    <Container>
      <div className="flex flex-col jsutify-center items-center w-2/3 gap-5 mt-[-20px]">
        <h1 className="font-bold text-3xl mt-[-200px]">Privacy Policy</h1>
        <p className='text-lg'>Effective date: September 01, 2021</p>
        <p className='w-[450px]'>
          Property Finder ("us", "we", or "our") operates the Property Finder
          website (the "Service").
        </p>

        <p className='w-[500px]'>
          This page informs you of our policies regarding the collection, use,
          and disclosure of personal data when you use our Service and the
          choices you have associated with that data.
        </p>

        <p className='w-[500px]'>
          We use your data to provide and improve the Service. By using the
          Service, you agree to the collection and use of information in
          accordance with this policy. Unless otherwise defined in this Privacy
          Policy, terms used in this Privacy Policy have the same meanings as in
          our Terms and Conditions, accessible from https://housemarket.com
        </p>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
