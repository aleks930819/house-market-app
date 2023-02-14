import Banner from '../components/Banner';
import ExploreSection from '../components/ExploreSection';
import Features from '../components/Features';
import StarterScreenWidget from '../components/StarterScreenWidget';
import useScrollToTop from '../hooks/useScrollToTop';

import ScrollToTopButton from '../components/ScrollToTopButton';

const StarterScreen = () => {

  const { isVisible } = useScrollToTop();

  return (
    <>
      <div className="">
        <Banner />
        <ExploreSection />
        <StarterScreenWidget />
        <Features />
        {isVisible && <ScrollToTopButton />}
      </div>
    </>
  );
};

export default StarterScreen;
