

const Table = ({ data, config }) => {
  const renderedHeaders = config.map((column) => {
    return (
      <th key={column.label} className="border">
        {column.label}
      </th>
    );
  });

  const redneredRows = data?.map((row) => {
    const renderedCells = config.map((column) => {
      return (
        <td key={column.label} className="p-3 border ">
          {column.render(row)}
        </td>
      );
    });

    return <tr key={row.id}>{renderedCells}</tr>;
  });

  return (
    <div className="rounded-lg ">
      <table className="shadow-lg text-base md:text-lg w-auto">
        <thead>
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{redneredRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
