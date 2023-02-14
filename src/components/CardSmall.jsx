import Button from './Button';
import { Facilities } from './Facilities';
import Row from './Row';

const CardSmall = ({ data }) => {
  //   const buttons = [
  //     {
  //       success: true,
  //       to: `/edit-properties/${listing?.id}`,
  //       name: 'Edit',
  //     },
  //     {
  //       danger: true,
  //       name: 'Delete',
  //       onClick: () => {
  //         console.log('Delete');
  //       },
  //     },
  //   ];

  return (
    <Row grid3>
      {data?.map((listing) => (
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
        </div>
      ))}
    </Row>
  );
};

export default CardSmall;
