import Banner from '../components/Banner';
import ExploreSection from '../components/ExploreRentals';
import Features from '../components/Features';
import StarterScreenWidget from '../components/StarterScreenWidget';
import useScrollToTop from '../hooks/useScrollToTop';

import ScrollToTopButton from '../components/ScrollToTopButton';
import ExploreRentals from '../components/ExploreRentals';
import Testimonials from '../components/Testimonials';
import SubscribePlansSection from '../components/SubscribePlansSection';

const StarterScreen = () => {
  const { isVisible } = useScrollToTop();

  return (
    <>
      <div className="">
        <Banner />
        <ExploreRentals />
        <StarterScreenWidget />
        <Testimonials />
        <SubscribePlansSection />
        <Features />
        {isVisible && <ScrollToTopButton />}
      </div>
    </>
  );
};

export default StarterScreen;
