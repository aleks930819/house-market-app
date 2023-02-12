import { useState } from 'react';

import { toast } from 'react-toastify';

import { updateDoc, doc } from 'firebase/firestore';

import Form from '../components/Form';
import Input from '../components/Input';
import Container from '../components/Container';
import Spinner from '../components/Spinner';

import { getAuth, updateProfile } from 'firebase/auth';

import setChangedValue from '../utils/changeHandler';

import { db } from '../../firbase.config';
import { useNavigate } from 'react-router-dom';
import uploadImages from '../utils/uploadImages';
import { useSelector } from 'react-redux';
import { selectDisplayName, selectEmail } from '../slices/authSlice';

const EditProfile = () => {
  const auth = getAuth();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const email = useSelector(selectEmail);
  const [firstName, lastName] = useSelector(selectDisplayName).split(' ');

  const [values, setValues] = useState({
    firstName,
    lastName,
    email,
    images: {},
  });

  const changeHandler = (e) => {
    setChangedValue(e, setValues);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const imgUrl = await Promise.all(
      [...values.images].map((image) => uploadImages(image))
    ).catch(() => {
      toast.error('Images not uploaded');
      return;
    });

    try {
      await updateProfile(auth.currentUser, {
        displayName: `${values.firstName} ${values.lastName}`,
        photoURL: imgUrl[0],
      });

      const userRef = doc(db, 'users', auth.currentUser.uid);

      await updateDoc(userRef, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      });

      toast.success('Profile updated successfully');
      navigate('/profile');
    } catch (err) {
      setLoading(false);

      toast.error('Could not update profile');
    }

    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Form heading="Edit Profile" btnName="Edit Profile" onSubmit={onSubmit}>
        <Input
          element="input"
          type="text"
          htmlFor="firstName"
          placeholder="First Name"
          name="firstName"
          handler={changeHandler}
          value={values.name}
          firstName={values.firstName}
          defaultValue={values.firstName}
          icon="user"
        />

        <Input
          element="input"
          type="text"
          htmlFor="lastName"
          placeholder="Last Name"
          name="lastName"
          value={values.name}
          handler={changeHandler}
          firstName={values.lastName}
          defaultValue={values.lastName}
          icon="user"
        />

        <Input
          element="input"
          type="text"
          htmlFor="email"
          placeholder="Your Email"
          name="email"
          value={values.name}
          handler={changeHandler}
          email={values.email}
          defaultValue={values.email}
          icon="email"
        />

        <div>
          <h2 className="text-xs sm:text-base pl-2 pb-1">
            Change Profile Photo
          </h2>
          <Input
            element="input"
            type="file"
            htmlFor="imageUrls"
            name="imageUrls"
            value={values.imageUrls}
            handler={changeHandler}
            max="1"
            accept=".jpg, .jpeg, .png"
          />
        </div>
      </Form>
    </Container>
  );
};

export default EditProfile;
