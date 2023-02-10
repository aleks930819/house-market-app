
import useScrollToTop from '../hooks/useScrollToTop';
import { BiArrowFromBottom } from 'react-icons/bi';

const ScrollToTopButton = () => {
    
  const { scrollToTop } = useScrollToTop();

  return (
    <div className="fixed bottom-2 right-2">
      <button
        type="button"
        onClick={scrollToTop}
        className="bg-cyan-900 hover:bg-cyan-700  inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
