import { StarterScreenWidgetData as data } from '../data/data.js';

const StarterScreenWidget = () => {
  return (
    <div className="w-full max-w-5xl p-5 pb-10 mx-auto mb-10  grid grid-cols-1 text-xs gap-5 sm:grid-cols-2 sm:gap-0">
      {data?.map((item) => (
        <div className="relative" key={item?.id}>
          <img
            src={item?.image}
            alt={item?.title}
            className="w-full h-96 object-cover brightness-50"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black bg-opacity-60 p-5">
            <h2 className="font-bold pb-2">{item?.title}</h2>
            <p className="leading-5">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StarterScreenWidget;
