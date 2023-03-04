import { AiFillDelete } from 'react-icons/ai';

const EditPropertiesImages = ({ images, deleteImageHandler }) => {
  return (
    <div>
      <label>Images:</label>
      <div className="grid  grid-cols-3  mt-2">
        {images?.map((image, index) => (
          <div
            key={index}
            className="flex flex-wrap flex-col items-center mb-3"
          >
            <img
              src={index === 0 ? images[0] : image}
              alt=""
              className="w-20 h-20 object-cover pb-1"
            />
            <AiFillDelete
              className="text-red-700 cursor-pointer text-2xl"
              onClick={() => deleteImageHandler(images[index])}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPropertiesImages;
