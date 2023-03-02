import Button from './Button';

import Table from './Table';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firbase.config';
import { toast } from 'react-toastify';

const AdminListingsTable = ({ data }) => {
  const deleteHandler = async (id) => {
    try {
      await deleteDoc(doc(db, 'listings', id));
      toast.success('Listing deleted successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const config = [
    {
      label: 'Name',
      render: (row) => row.name,
    },

    {
      label: 'Delete',
      render: (row) => (
        <Button danger onClick={() => deleteHandler(row.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return <Table data={data} config={config} />;
};

export default AdminListingsTable;
