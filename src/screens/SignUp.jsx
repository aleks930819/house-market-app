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

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import Container from '../components/Container';
import Form from '../components/Form';
import Input from '../components/Input';
import OAuth from '../components/OAuth';

import setChangedValue from '../utils/changeHandler';

import { db } from '../../firbase.config';

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

  console.log(values);

  const onSubmit = async (e) => {
    e.preventDefault();

    const uploadImages = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, `images/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case 'paused':
                break;
              case 'running':
                break;
            }
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

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

      const formDataCopy = { ...values, images: imgUrl };

      delete formDataCopy.repassword;
      delete formDataCopy.password;

      formDataCopy.timestamp = serverTimestamp();
      formDataCopy.fullName = fullNameOfTheUser;

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error('User already exists!');
    }
  };

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
        <Input
          element="input"
          type="password"
          htmlFor="password"
          placeholder="Password"
          name="password"
          value={values.name}
          handler={changeHandler}
          password={values.password}
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
          icon="password"
        />

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
            max="6"
            accept=".jpg, .jpeg, .png"
            multiple
          />
        </div>

        <div className="text-end flex  justify-center">
          <OAuth />
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
