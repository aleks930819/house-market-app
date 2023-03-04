import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { doc, updateDoc, getDoc } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import Spinner from '../components/Spinner';

import { db } from '../../firbase.config';

import setChangedValue from '../utils/changeHandler';
import useDeleteImage from '../hooks/useDeleteImage';
import EditPropertiesImages from '../components/EditPropertiesImages';
import uploadFormData from '../utils/uploadFormData';

const EditProperties = () => {
  const { id } = useParams();

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

  const { deleteImageHandler } = useDeleteImage(
    id,
    values,
    setValues,
    setImages
  );

  const auth = getAuth();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setChangedValue(e, setValues);
  };

  useEffect(() => {
    setLoading(true);

    const fetchListing = async () => {
      const docRef = doc(db, 'listings', id);
      const docSnap = await getDoc(docRef);
      const { imgUrls } = docSnap.data();

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setValues((prev) => ({
          ...prev,
          ...docSnap.data(),
          images: {},
        }));

        setImages(imgUrls);

        setLoading(false);
      } else {
        toast.error('Listing does not exist');
        navigate('/');
      }
      setLoading(false);
    };

    fetchListing();
  }, [id, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formDataCopy = await uploadFormData(
      values,
      auth.currentUser.uid,
      images
    );

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
          <label>Regular Price {values.type === 'rent' ? '/ Month' : ''}</label>
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
        <EditPropertiesImages
          images={images}
          deleteImageHandler={deleteImageHandler}
        />
      </Form>
    </div>
  );
};

export default EditProperties;
