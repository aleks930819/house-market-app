import className from 'classnames';

const Row = ({ children, grid3, flex, ...rest }) => {
  const classes = className(
    rest.className,

    {
      'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 mb-5': grid3,
      'flex flex-col w-3/4 gap-5 mx-auto sm:flex-row ': flex,
    }
  );

  return (
    <div {...rest} className={classes} >
      {children}
    </div>
  );
};
export default Row;
