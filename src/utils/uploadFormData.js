import uploadImages from './uploadImages';

import { toast } from 'react-toastify';
import { serverTimestamp } from 'firebase/firestore';

async function uploadFormData(values, userID, images) {

  try {
    const imgUrls = await Promise.all(
      [...values.images].map((image) => uploadImages(image))
    );

    const formDataCopy = {
      ...values,
      imgUrls: images ? [...images, ...imgUrls] : [...imgUrls],
      userRef: userID,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;

    return formDataCopy;
  } catch (error) {
    toast.error('Images not uploaded');
  }
}

export default uploadFormData;
