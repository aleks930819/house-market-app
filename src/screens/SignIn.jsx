import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Container from '../components/Container';
import Form from '../components/Form';
import Input from '../components/Input';
import setChangedValue from '../utils/changeHandler';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { BsTwitter } from 'react-icons/bs';

const SignIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setChangedValue(e, setValues);
  };

  return (
    <Container>
      <Form heading="Sign In" btnName="Sign In">
        <Input
          element="input"
          type="text"
          htmlFor="email"
          placeholder="Your Email"
          name="email"
          value={values.name}
          handler={changeHandler}
          email={values.email}
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
        />
        <div className="text-end flex  justify-between">
          <div className="flex gap-1">
            <FcGoogle className=" cursor-pointer text-base" />
            <AiFillGithub className=" cursor-pointer text-base" />
            <BsTwitter className=" cursor-pointer text-base text-indigo-500" />
          </div>
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
