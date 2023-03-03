import { useEffect } from 'react';

import { where, orderBy, limit } from 'firebase/firestore';

import { useSelector } from 'react-redux';

import Container from '../components/Container';
import Spinner from '../components/Spinner';
import ProfileCard from '../components/ProfileCard';
import AddPropertySuggestion from '../components/AddPropertySuggestion';
import MyProperties from '../components/MyProperties';

import { selectUserID } from '../slices/authSlice';
import useGetData from '../hooks/useGetData';

const Profile = () => {
  const userId = useSelector(selectUserID);

  const {
    data: properties,
    loading,
    getData,
  } = useGetData(
    'listings',
    orderBy('timestamp', 'desc'),
    where('userRef', '==', userId),
    limit(10)
  );

  useEffect(() => {
    if (!properties) {
      getData();
    }
  }, [getData, properties]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Container>
      <ProfileCard />
      {properties?.length === 0 ? <AddPropertySuggestion /> : <MyProperties />}
    </Container>
  );
};

export default Profile;
