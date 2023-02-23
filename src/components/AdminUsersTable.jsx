import Button from './Button';
import Table from './Table';

const AdminUsersTable = ({ data }) => {
  const config = [
    {
      label: 'Name',
      render: (row) => row.fullName || `${row.firstName} ${row.lastName}`,
    },
    {
      label: 'Email',
      render: (row) => row.email,
    },

    {
      label: 'Role',
      render: (row) => row.role,
    },
    {
      label: 'Delete',
      render: (row) => (
        <Button danger onClick={() => console.log(row.email)}>
          Delete
        </Button>
      ),
    },
  ];

  return <Table data={data} config={config} />;
};

export default AdminUsersTable;
