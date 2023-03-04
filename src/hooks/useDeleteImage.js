import { doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject, getStorage } from 'firebase/storage';
import { toast } from 'react-toastify';
import { db, } from '../../firbase.config';

const useDeleteImage = (id, values, setValues, setImages) => {
  const storage = getStorage();

  const deleteImageHandler = async (url) => {
    setImages((prev) => prev.filter((img) => img !== url));

    setValues((prev) => ({
      ...prev,
      images: prev.imgUrls.filter((img) => img !== url),
    }));

    const imgUrls = values.imgUrls.filter((img) => img !== url);

    await updateDoc(doc(db, 'listings', id), {
      imgUrls,
    });

    const desertRef = ref(storage, url);

    deleteObject(desertRef)
      .then(() => {
        toast.success('Image deleted successfully');
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };

  return { deleteImageHandler };
};

export default useDeleteImage;
