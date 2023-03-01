const Table = ({ data, config }) => {
  const renderedHeaders = config.map((column) => {
    return (
      <th
        key={column.label}
        scope="col"
        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-black "
      >
        {column.label}
      </th>
    );
  });

  const redneredRows = data?.map((row) => {
    const renderedCells = config.map((column) => {
      return (
        <td
          key={column.label}
          className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
        >
          {column.render(row)}
        </td>
      );
    });

    return <tr key={row.id}>{renderedCells}</tr>;
  });

  return (
    <div className="rounded-lg ">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-slate-300">
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody className=" bg-slate-600 divide-y divide-gray-200 ">
          {redneredRows}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
