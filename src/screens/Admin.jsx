import { useState } from 'react';
import Button from '../components/Button';
import { db } from '../../firbase.config';
import { collection, getDocs } from 'firebase/firestore';
import UsersTable from '../components/UsersTable';
import AdminMessagesTable from '../components/AdminMessagesTable';
import Spinner from '../components/Spinner';
import AdminListingsTable from '../components/AdminListingsTable';

const Admin = () => {
  const buttonsType = ['users', 'listings', 'messages'];
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [activeFilterButton, setActiveFilterButton] = useState(null);
  const [loading, setLoading] = useState(false);

  const filterProperties = async (type) => {
    setActiveFilterButton(type);

    if (type === 'messages') {
      type = 'contact-us';
    }

    type = type.toLowerCase();

    try {
      setLoading(true);
      const ref = collection(db, type);

      const snapshot = await getDocs(ref);

      const data = [];

      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setFilteredProperties(data);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }

    setLoading(false);
  };

  const element = () => {
    if (activeFilterButton === 'users') {
      return <UsersTable data={filteredProperties} />;
    } else if (activeFilterButton === 'listings') {
      return <AdminListingsTable data={filteredProperties} />;
    } else if (activeFilterButton === 'messages') {
      return <AdminMessagesTable data={filteredProperties} />;
    }
  };


  return (
    <div className="flex  flex-col   items-center min-h-screen">
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 ">
        {buttonsType.map((type) => (
          <Button
            key={type}
            onClick={() => {
              filterProperties(type);
            }}
            success={activeFilterButton === type}
          >
            {type[0].toUpperCase() + type.slice(1) || 'Users'}
          </Button>
        ))}
      </div>
      {loading && <Spinner />}

      {element()}
    </div>
  );
};

export default Admin;
