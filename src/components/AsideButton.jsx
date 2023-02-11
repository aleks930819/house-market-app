const AsideButton = ({ setIsOpen }) => {
  return (
    <button
      data-drawer-target="separator-sidebar"
      data-drawer-toggle="separator-sidebar"
      aria-controls="separator-sidebar"
      type="button"
      onClick={() => {
        setIsOpen(true);
      }}
      className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-black rounded-lg  hover:bg-gray-500 focus:outline-none  dark:text-slate-800 dark:hover:bg-slate-200 dark:focus:ring-gray-400"
    >
      <span className="sr-only">Open sidebar</span>

      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        />
      </svg>
    </button>
  );
};

export default AsideButton;
