import className from 'classnames';
import { Link } from 'react-router-dom';
import ButtonSpiner from './ButtonSpiner';

const Button = ({
  children,
  primary,
  success,
  danger,
  warning,
  yellow,
  outline,
  rounded,
  roundedSmall,
  dark,
  disabled,
  loading,
  to,

  ...rest
}) => {
  const classes = className(
    rest.className,
    'flex justify-between items-center px-7 py-2.5  border h-8 text-xs sm:text-sm',
    {
      'border-blue-500 bg-cyan-900 p-5 text-white hover:bg-cyan-700 transition':
        primary,
      'border-green-500 bg-green-500 text-white hover:bg-green-600': success,
      'border-yellow-400 bg-yellow-400 text-white': warning,
      'border-yellow-400 bg-yellow-400 text-dark': yellow,

      'border-red-500 bg-red-500 text-white hover:bg-red-600': danger,
      'rounded-full': rounded,
      'rounded-sm': roundedSmall,
      'bg-white': outline,
      'bg-zinc-500': dark,
      'opacity-50 cursor-not-allowed': disabled,
      'text-blue-500': outline && primary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
    }
  );

  if (to) {
    return (
      <Link {...rest} to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button {...rest} className={classes}>
      {loading ? <ButtonSpiner /> : children}
    </button>
  );
};

export default Button;
