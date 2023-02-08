import { useState } from 'react';
import Button from './Button';
import { Facilities } from './Facilities';

const MyProperties = ({
  filteredProperties,
  handleModalView,
  setItemToDeleteId,
  properties,
  setFilteredProperties,
}) => {
    
  const buttonsType = ['sale', 'rent', 'all'];
  const [activeFilterButton, setActiveFilterButton] = useState('all');

  const filterProperties = (type) => {
    setActiveFilterButton(type);
    if (type === 'all') {
      setFilteredProperties(properties);
      return;
    }

    const filtered = properties.filter((property) => property.type === type);
    setFilteredProperties(filtered);
  };

  return (
    <div className="mb-10">
      <div>
        <h1 className="font-bold mt-5 sm:text-lg md:text-xl pb-5">
          My Properties
        </h1>
        <div className="flex gap-1">
          {buttonsType.map((type) => (
            <Button
              onClick={() => filterProperties(type)}
              success={activeFilterButton === type}
            >
              {type[0].toUpperCase() + type.slice(1) || 'All'}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {filteredProperties?.map((listing) => (
          <div
            className="border shadow-md p-5 flex flex-col gap-2 rounded-md cursor-pointer"
            key={listing?.id}
          >
            <div className="flex items-center gap-2">
              <img
                src={listing?.imgUrls[0]}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex flex-col pl-5">
                <h1 className="font-bold">{listing?.name}</h1>
                <Facilities listing={listing} key={listing?.id} />
              </div>
            </div>
            <div className="flex gap-1 pt-5">
              <Button
                danger
                onClick={() => {
                  handleModalView();
                  setItemToDeleteId(listing?.id);
                }}
              >
                Delete
              </Button>
              <Button success={true} to={`/edit-properties/${listing?.id}`}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
