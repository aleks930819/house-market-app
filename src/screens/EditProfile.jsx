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

const EditProfile = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: `${values.firstName} ${values.lastName}`,
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

  const changeHandler = (e) => {
    setChangedValue(e, setValues);
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
          value={values.name}
          handler={changeHandler}
          firstName={values.firstName}
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
          icon="email"
        />
      </Form>
    </Container>
  );
};

export default EditProfile;
