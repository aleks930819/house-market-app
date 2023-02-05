import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Form from '../components/Form';
import Input from '../components/Input';
import setChangedValue from '../utils/changeHandler';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { BsTwitter } from 'react-icons/bs';

const SignUp = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    repassword: '',
  });

  const changeHandler = (e) => {
    setChangedValue(e, setValues);
  };

  return (
    <Container>
      <Form heading="Sign Up" btnName="Sign Up">
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

        <Input
          element="input"
          type="password"
          htmlFor="password"
          placeholder="Repeat password"
          name="password"
          value={values.name}
          handler={changeHandler}
          repassword={values.repassword}
        />
        <div className="text-end flex  justify-center">
          <div className="flex gap-1">
            <FcGoogle className=" cursor-pointer text-base" />
            <AiFillGithub className=" cursor-pointer text-base" />
            <BsTwitter className=" cursor-pointer text-base text-indigo-500" />
          </div>
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
