import Banner from '../components/Banner';
import ExploreSection from '../components/ExploreSection';
import Features from '../components/Features';
import StarterScreenWidget from '../components/StarterScreenWidget';

const StarterScreen = () => {
  return (
    <div className="">
      <Banner />
      <ExploreSection/>
      <Features/>
      {/* <StarterScreenWidget/> */}
    </div>
  );
};

export default StarterScreen;
