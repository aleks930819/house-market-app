import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUserAlt } from 'react-icons/fa';

const Input = (props) => {
  const element =
    props.element === 'input' ? (
      <input
        htmlFor={props.htmlFor}
        name={props.name}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.values}
        onChange={props.handler}
        onBlur={props.onBlur}
        max={props.max}
        min={props.min}
        multiple={props.multiple}
        accept={props.accept}
        defaultValue={props.defaultValue}
        className="border-2 border-gray-300 rounded-md p-2 text-sm focus:bg-white focus:border-slate-400 focus:outline-none w-full relative pl-8  file:rounded-full file:border-0 file:mr-5 file:py-2 file:px-5 file:bg-cyan-900 file:text-white file:text-xs"
      />
    ) : (
      <textarea
        id={props.id}
        htmlFor={props.htmlFor}
        name={props.name}
        rows={props.rows || 4}
        cols={props.cols || 10}
        onChange={props.handler}
        placeholder={props.placeholder}
        value={props.value}
        defaultValue={props.defaultValue}
        className="border-2 border-gray-300 rounded-md p-2 text-sm focus:bg-white focus:border-slate-400 focus:outline-none w-full"
      />
    );

  const lookup = {
    email: <MdEmail />,
    password: <RiLockPasswordFill />,
    user: <FaUserAlt />,
  };

  return (
    <>
      <div>
        <div className="flex mx-auto mb-5 justify-center items-center relative">
          {element}

          {props.icon && (
            <div className="pointer-events-none text-sm absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400">
              {lookup[props.icon]}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
