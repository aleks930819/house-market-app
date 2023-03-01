import Search from './Search';
import LinksAndActions from './LinksAndActions';

const AsideItem = () => {
  return (
    <aside
      id="separator-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-0 sm:translate-x-0 bg-slate-200"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-slate-400" >
        <LinksAndActions  />

        <Search />
      </div>
    </aside>
  );
};

export default AsideItem;
