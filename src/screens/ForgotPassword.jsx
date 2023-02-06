import { useState } from 'react';
import Form from '../components/Form';
import Input from '../components/Input';
import Container from '../components/Container';
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email);
      toast.success('Check your email');
    } catch (error) {
      toast.error('Could not send reset email');
    }
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit} btnName="Send" heading="Forgot Password">
        <Input
          element="input"
          type="text"
          htmlFor="email"
          placeholder="Your Email"
          name="email"
          value={email}
          handler={emailChangeHandler}
          email={email}
          icon="email"
        />
      </Form>
    </Container>
  );
};

export default ForgotPassword;
