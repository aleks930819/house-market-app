import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import setChangedValue from '../utils/changeHandler';

import Container from '../components/Container';
import Form from '../components/Form';
import Input from '../components/Input';
import OAuth from '../components/OAuth';

const SignIn = () => {
  
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setChangedValue(e, setValues);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (userCredential.user) {
        navigate('/');
      }
    } catch (err) {
      toast.error('Wrong email or password');
    }
  };

  return (
    <Container>
      <Form heading="Sign In" btnName="Sign In" onSubmit={onSubmit}>
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
        <div className="text-end flex  justify-between items-center">
          <OAuth btnName={'Sign In With Google'}/>
        </div>
        <div className='mt-2 text-end'>
          <Link
            to="/forgot-password"
            className=" text-gray-500 text-xs underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="pt-10">
          <Link to="/sign-up">
            <h5>Don't have an account? Sign Up</h5>
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignIn;
