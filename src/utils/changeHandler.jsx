const setChangedValue = (e, setValue) => {
  setValue((state) => ({ ...state, [e.target.name]: e.target.value }));
  return (e.value = e.target.value);
};

export default setChangedValue;
