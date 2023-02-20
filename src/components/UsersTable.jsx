import Button from './Button';
import Table from './Table';

const UsersTable = ({ data }) => {
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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Table data={data} config={config} />
    </div>
  );
};

export default UsersTable;
