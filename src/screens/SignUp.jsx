import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

import Container from '../components/Container';
import Form from '../components/Form';
import Input from '../components/Input';
import OAuth from '../components/OAuth';

import setChangedValue from '../utils/changeHandler';

import { db } from '../../firbase.config';
import uploadImages from '../utils/uploadImages';
import useValidators from '../hooks/useValidators';
import ValidationMessage from '../components/ValidationMessage';

const SignUp = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repassword: '',
    images: {},
  });

  const changeHandler = (e) => {
    setChangedValue(e, setValues);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const imgUrl = await Promise.all(
      [...values.images].map((image) => uploadImages(image))
    ).catch(() => {
      toast.error('Images not uploaded');
      return;
    });

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      const fullNameOfTheUser = `${values.firstName} ${values.lastName}`;

      updateProfile(auth.currentUser, {
        displayName: fullNameOfTheUser,
        photoURL: imgUrl[0],
      });

      const formDataCopy = { ...values, imgUrl };

      delete formDataCopy.repassword;
      delete formDataCopy.password;
      delete formDataCopy.images;

      formDataCopy.timestamp = serverTimestamp();
      formDataCopy.fullName = fullNameOfTheUser;

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (err) {
      toast.error('User already exists!');
    }
  };

  const {
    message,
    setMessage,
    checkEmail,
    checkPassword,
    checkRepassword,
    checkFirstName,
    checkLastName,
  } = useValidators({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    repassword: values.repassword,
  });

  return (
    <Container>
      <Form heading="Sign Up" btnName="Sign Up" onSubmit={onSubmit}>
        <Input
          element="input"
          type="text"
          htmlFor="firstName"
          placeholder="First Name"
          name="firstName"
          value={values.name}
          handler={changeHandler}
          firstName={values.firstName}
          onBlur={checkFirstName}
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
          onBlur={checkLastName}
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
          onBlur={checkEmail}
          icon="email"
        />
        <Input
          element="input"
          type="password"
          htmlFor="password"
          placeholder="Password"
          name="password"
          value={values.name}
          handler={changeHandler}
          password={values.password}
          onBlur={checkPassword}
          icon="password"
        />

        <Input
          element="input"
          type="password"
          htmlFor="password"
          placeholder="Repeat password"
          name="repassword"
          value={values.name}
          handler={changeHandler}
          repassword={values.repassword}
          onBlur={checkRepassword}
          icon="password"
        />

        {message && <ValidationMessage message={message} />}

        <div>
          <h2 className="text-xs sm:text-base pl-2 pb-1">Profile Photo</h2>
          <Input
            element="input"
            type="file"
            htmlFor="imageUrls"
            placeholder="Images"
            name="imageUrls"
            value={values.imageUrls}
            handler={changeHandler}
            max="1"
            accept=".jpg, .jpeg, .png"
          />
        </div>

        <div className="text-end flex  justify-center">
          <OAuth btnName={'Sign Up With Google'} />
        </div>
        <div className="pt-10">
          <Link to="/sign-in">
            <h5>Already have an account? Sign In</h5>
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignUp;
