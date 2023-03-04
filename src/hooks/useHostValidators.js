import { useState } from 'react';

const useHostValidators = (initialState) => {
  const [errors, setErrors] = useState('');

  const validateForm = (values) => {
    const {
      bathrooms,
      bedrooms,
      name,
      location,
      regularPrice,
      longitude,
      latitude,
      images,
    } = values;

    const newErrors = {};

    if (
      values.bathrooms === 0 ||
      values.bedrooms === 0 ||
      values.name === '' ||
      values.location === '' ||
      values.regularPrice < 1 ||
      values.longitude === 0 ||
      values.latitude === 0
    ) {
      newErrors.errorMessage = 'All fields are required';
    }

    if (values?.images?.length > 6) {
      newErrors.errorMessage = 'You can only upload a maximum of 6 images';
    }

    if (values?.images?.length === 0) {
      newErrors.errorMessage = 'Images are required';
    }

    if (values?.images?.length < 3) {
      newErrors.errorMessage = 'You must upload a minimum of 3 images';
    }

    setErrors(newErrors);
  };

  return { errors, validateForm };
};

export default useHostValidators;
