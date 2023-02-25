import Button from './Button';
import Row from './Row';

const data = [
  {
    id: 1,
    title: '1 Month Plan',
    description:
      'Monthly plan of $1.99/month. Cancel anytime.',
    price: '$1.99',
  },
  {
    id: 2,
    title: '6 Months Plan',
    description:
    'Six-month plan for $4.99. Cancel anytime.',
    price: '$4.99',
  },

  {
    id: 3,
    title: '1 Year Plan',
    description:
      'One-year plan for $9.99. Cancel anytime.',
    price: '$9.99',
  },
];

const SubscribePlansSection = () => {
  return (
    <Row
      grid3
      className="mt-[100px] mb-[100px]  w-3/4 items-center place-items-center mx-auto gap-10"
    >
      {data.map((item) => (
        <div>
          <div
            className={
              item.id === 2
                ? 'max-w-sm bg-slate-400 border border-gray-200 rounded-lg shadow-lg transform scale-[1.1] z-10'
                : 'max-w-sm bg-slate-200 border border-gray-200 rounded-lg shadow-lg'
            }
          >
            <div className="p-5">
              <h5 className="mb-2 text-lg sm:text-2xl font-bold tracking-tight text-gray-900">
                {item?.title}
              </h5>
              <p className="mb-3 font-normal text-gray-900">
                {item?.description}
              </p>
              <p className="pb-3">
                <span className=" text-base sm:text-2xl font-bold text-gray-900 p">
                  {item?.price}
                </span>
              </p>
              <Button primary className="border-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      ))}
    </Row>
  );
};

export default SubscribePlansSection;
