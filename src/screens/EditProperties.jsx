import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

import { getAuth, onAuthStateChanged, updateCurrentUser } from 'firebase/auth';

import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';

import setChangedValue from '../utils/changeHandler';

import { db } from '../../firbase.config';
import Spinner from '../components/Spinner';
import uploadImages from '../utils/uploadImages';

const EditProperties = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [images, setImages] = useState([]);

  const [values, setValues] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    location: '',
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const auth = getAuth();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setChangedValue(e, setValues);
  };

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchListing = async () => {
      const docRef = doc(db, 'listings', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setValues((prev) => ({
          ...prev,
          ...docSnap.data(),
          images: {},
        }));

        setImages(docSnap.data().imgUrls);

        setLoading(false);
      } else {
        toast.error('Listing does not exist');
        navigate('/');
      }
      setLoading(false);
    };

    fetchListing();
  }, []);

  const storage = getStorage();

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const imgUrls = await Promise.all(
      [...values.images].map((image) => uploadImages(image))
    ).catch(() => {
      toast.error('Images not uploaded');
      return;
    });

    const formDataCopy = {
      ...values,
      imgUrls: [...images, ...imgUrls],
      userRef: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    };
    delete formDataCopy.images;

    try {
      setLoading(true);
      await updateDoc(doc(db, 'listings', id), formDataCopy);
      toast.success('Listing updated successfully');
      navigate('/profile');
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong');
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

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

  return (
    <div className="flex flex-col  justify-center items-center mb-10 mt-16">
      <Form heading="Edit" btnName="Edit" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2 pb-5">
          <label>Sell / Rent</label>
          <div className="flex gap-2">
            <Button
              rounded
              type={'button'}
              success={values.type === 'sale'}
              onClick={() => setValues({ ...values, type: 'sale' })}
            >
              Sell
            </Button>
            <Button
              type={'button'}
              rounded
              success={values.type === 'rent'}
              onClick={() => setValues({ ...values, type: 'rent' })}
            >
              Rent
            </Button>
          </div>
        </div>
        <Input
          element="input"
          type="text"
          htmlFor="name"
          placeholder="Name"
          name="name"
          value={values.name}
          defaultValue={listing?.name}
          handler={changeHandler}
        />
        <div className="flex gap-1 ">
          <Input
            element="input"
            type="number"
            htmlFor="bedrooms"
            placeholder="Bedrooms"
            name="bedrooms"
            value={values.bedrooms}
            defaultValue={listing?.bedrooms}
            handler={changeHandler}
          />

          <Input
            element="input"
            type="number"
            htmlFor="bathrooms"
            placeholder="Bathrooms"
            name="bathrooms"
            value={values.bathrooms}
            defaultValue={listing?.bathrooms}
            handler={changeHandler}
          />
        </div>
        <div className="flex flex-col gap-2 pb-5">
          <label>Parking spot</label>
          <div className="flex gap-2">
            <Button
              type={'button'}
              rounded
              danger={values.parking === false}
              onClick={() => setValues({ ...values, parking: false })}
            >
              No
            </Button>
            <Button
              type={'button'}
              rounded
              success={values.parking === true}
              onClick={() => setValues({ ...values, parking: true })}
            >
              Yes
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 pb-5">
          <label>Furnished</label>
          <div className="flex gap-2">
            <Button
              type={'button'}
              rounded
              danger={values.furnished === false}
              onClick={() => setValues({ ...values, furnished: false })}
            >
              No
            </Button>
            <Button
              type={'button'}
              rounded
              success={values.furnished === true}
              onClick={() => setValues({ ...values, furnished: true })}
            >
              Yes
            </Button>
          </div>
        </div>
        <Input
          element="textarea"
          type="text"
          htmlFor="location"
          placeholder="Location"
          name="location"
          value={values.location}
          defaultValue={listing?.location}
          handler={changeHandler}
        />
        <div className="flex gap-1 ">
          <Input
            element="input"
            type="text"
            htmlFor="latitude"
            placeholder="Latitude"
            name="latitude"
            value={values.latitude}
            defaultValue={listing?.latitude}
            handler={changeHandler}
          />

          <Input
            element="input"
            type="text"
            htmlFor="longitude"
            placeholder="longitude"
            name="longitude"
            value={values.longitude}
            defaultValue={listing?.longitude}
            handler={changeHandler}
          />
        </div>
        <div className="flex flex-col gap-2 pb-5">
          <label>Offer</label>
          <div className="flex gap-2">
            <Button
              type={'button'}
              rounded
              danger={values.offer === false}
              onClick={() => setValues({ ...values, offer: false })}
            >
              No
            </Button>
            <Button
              type={'button'}
              rounded
              success={values.offer === true}
              onClick={() => setValues({ ...values, offer: true })}
            >
              Yes
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <label>
            Regular Price {values.type === 'rent' ? '/ Month' : ''}{' '}
          </label>
          <Input
            element="input"
            type="number"
            htmlFor="regularPrice"
            placeholder="Regular Price"
            name="regularPrice"
            value={values.regularPrice}
            defaultValue={listing?.regularPrice}
            handler={changeHandler}
          />
        </div>

        {values.offer && (
          <div className="flex flex-col gap-1 ">
            <label>Discount Price</label>
            <Input
              element="input"
              type="number"
              htmlFor="discountPrice"
              placeholder="Discount Price"
              name="discountPrice"
              value={values.discountPrice}
              defaultValue={listing?.discountPrice}
              handler={changeHandler}
            />
          </div>
        )}

        <div className="flex flex-col gap-1 ">
          <label>The first image will be the main image (min 3) (max 6)</label>
          <Input
            element="input"
            type="file"
            htmlFor="imageUrls"
            placeholder="Images"
            name="imageUrls"
            value={values.imageUrls}
            handler={changeHandler}
            max="6"
            accept=".jpg, .jpeg, .png"
            multiple
          />
        </div>
        <div>
          <label>Images:</label>
          <div className="flex flex-wrap gap-2 pt-5">
            {images?.map((image, index) => (
              <div key={index} className="flex flex-wrap flex-col items-center">
                <img
                  src={index === 0 ? images[0] : image}
                  alt="image"
                  className="w-20 h-20 object-cover pb-5"
                />
                <Button
                  danger
                  rounded
                  type="button"
                  onClick={() => deleteImageHandler(images[index])}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditProperties;
