import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../firbase.config';

import Spinner from '../components/Spinner';
import AdminListingsTable from '../components/AdminListingsTable';
import AdminMessagesTable from '../components/AdminMessagesTable';
import AdminSidebar from '../components/AdminSidebar';
import AdminUserTable from '../components/AdminUsersTable';

const Admin = () => {
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
    }

    setLoading(false);
  };

  useEffect(() => {
    filterProperties('users');
  }, []);

  const lookup = {
    users: <AdminUserTable data={filteredProperties} />,
    listings: <AdminListingsTable data={filteredProperties} />,
    messages: <AdminMessagesTable data={filteredProperties} />,
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-6 min-h-screen">
      <div className="col-start-1 col-end-1">
        <AdminSidebar filterProperties={filterProperties} />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="col-start-2 col-end-7">
          {lookup[activeFilterButton]}
        </div>
      )}
    </div>
  );
};

export default Admin;
