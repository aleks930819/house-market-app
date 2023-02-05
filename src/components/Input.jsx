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
        className="border-2 border-gray-300 rounded-md p-2 text-sm focus:bg-white focus:border-slate-400 focus:outline-none w-full"
      />
    ) : (
      <textarea
        id={props.id}
        htmlFor={props.htmlFor}
        name={props.name}
        rows={props.rows || 4}
        onChange={props.handler}
        placeholder={props.placeholder}
        value={props.value}
        className="border-2 border-gray-300 rounded-md p-2 text-sm focus:bg-white focus:border-slate-400 focus:outline-none w-full"
      />
    );

  return (
    <div>
      <div className="flex mx-auto mb-5 justify-center items-center">
        {element}
      </div>
    </div>
  );
};

export default Input;
