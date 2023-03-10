import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addDoc, collection } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';

import setChangedValue from '../utils/changeHandler';

import { db } from '../../firbase.config';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';
import { selectPlan } from '../slices/authSlice';
import SubscriptionSudjection from './SubscriptionSudjection';
import uploadFormData from '../utils/uploadFormData';
import useHostValidators from '../hooks/useHostValidators';

const Host = () => {
  const [loading, setLoading] = useState(false);
  const currentUserPlan = useSelector(selectPlan);

  const [values, setValues] = useState({
    type: 'rent',
    name: '',
    bedrooms: 0,
    bathrooms: 0,
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

  const { errors, validateForm } = useHostValidators();

  const auth = getAuth();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setChangedValue(e, setValues);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    validateForm(values);

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      toast.error(`${errors.errorMessage}`);
      return;
    }

    const formDataCopy = await uploadFormData(values, auth.currentUser.uid);

    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
      toast.success('Listing added successfully');
      navigate(`/details/${docRef.id}`);
    } catch (err) {
      setLoading(false);
      toast.error('Something went wrong');
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  if (currentUserPlan === 'free') {
    return <SubscriptionSudjection />;
  }

  return (
    <div className="flex flex-col  justify-center items-center mb-10 mt-16">
      <Form heading="Add Property" btnName="Send" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2 pb-5">
          <label>Sell / Rent / Stay </label>
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
            <Button
              type={'button'}
              rounded
              success={values.type === 'stay'}
              onClick={() => setValues({ ...values, type: 'stay' })}
            >
              Stay
            </Button>
          </div>
        </div>
        <Input
          element="input"
          type="text"
          htmlFor="name"
          placeholder="*Name"
          name="name"
          value={values.name}
          handler={changeHandler}
        />
        <div className="flex gap-1 ">
          <Input
            element="input"
            type="number"
            htmlFor="bedrooms"
            placeholder="*Bedrooms"
            name="bedrooms"
            value={values.bedrooms}
            handler={changeHandler}
          />

          <Input
            element="input"
            type="number"
            htmlFor="bathrooms"
            placeholder="*Bathrooms"
            name="bathrooms"
            value={values.bathrooms}
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
          placeholder="*Location"
          name="location"
          value={values.location}
          handler={changeHandler}
        />
        <div className="flex gap-1 ">
          <Input
            element="input"
            type="text"
            htmlFor="latitude"
            placeholder="*Latitude"
            name="latitude"
            value={values.latitude}
            handler={changeHandler}
          />

          <Input
            element="input"
            type="text"
            htmlFor="longitude"
            placeholder="*Longitude"
            name="longitude"
            value={values.longitude}
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
            {values.type === 'stay' ? '/ Day' : ''}
          </label>
          <Input
            element="input"
            type="number"
            htmlFor="regularPrice"
            placeholder="*Regular Price"
            name="regularPrice"
            value={values.regularPrice}
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
      </Form>
    </div>
  );
};

export default Host;
