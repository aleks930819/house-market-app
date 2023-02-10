import Button from '../components/Button';

const Form = (props) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className="border-2 -mt-12 text-sm  shadow-md rounded-md flex flex-col justify-center items-center gap-5 p-5 "
    >
      <h2 className="text-center md:text-lg">{props.heading}</h2>
      <div>{props.children}</div>
      <Button primary className="text-center">
        {props.btnName}
      </Button>
    </form>
  );
};

export default Form;
