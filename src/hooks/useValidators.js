import { useState } from 'react';

const useValidators = ({
  email,
  password,
  repassword,
  text,
  firstName,
  lastName,
}) => {
  const [message, setMessage] = useState('');

  const checkFirstName = () => {
    let pattern = /^[A-Z][a-z]{2,}$/;

    if (!pattern.test(firstName.trim())) {
      setMessage('Invalid first name!');
    }

    if (0 === firstName.length) {
      setMessage('Please enter your first name');
    } else {
      setMessage('');
    }
  };

  const checkLastName = () => {
    let pattern = /^[A-Z][a-z]{2,}$/;

    if (!pattern.test(lastName.trim())) {
      setMessage('Invalid last name!');
    }

    if (0 === firstName.length) {
      setMessage('Please enter your last name');
    } else {
      setMessage('');
    }
  };

  const checkEmail = () => {
    let pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (email === '') {
      setMessage('Invalid email!');
    }
    if (!pattern.test(email.trim())) {
      setMessage('Invalid email!');
    } else {
      setMessage('');
    }
  };

  const checkPassword = () => {
    if (6 > password.length) {
      setMessage('Password must be at least 6 characters');
    } else {
      setMessage('');
    }
  };

  const checkRepassword = () => {
    if (6 > password.length) {
      setMessage('Password must be at least 6 characters');
    } else if (password !== repassword) {
      setMessage('Password dont match!');
    } else {
      setMessage('');
    }
  };

  const checkMessage = () => {
    if (0 === text.length) {
      setMessage('Please enter a message');
    } else {
      setMessage('');
    }
  };

 

  return {
    checkEmail,
    checkPassword,
    checkRepassword,
    checkMessage,
    checkFirstName,
    checkLastName,
    message,
    setMessage,
  };
};

export default useValidators;
