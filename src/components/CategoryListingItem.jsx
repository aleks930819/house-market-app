import Card from './Card';

const CategoryListingItem = ({ data }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10 lg:grid lg:grid-cols-2 gap-y-2.5 place-items-center lg:w-3/4 mx-auto">
        {data?.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default CategoryListingItem;
