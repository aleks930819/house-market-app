import { useState } from 'react';
import LinkItem from './LinkItem';
import Search from './Search';

const AsideItem = ({ loggedOutLinks, loggedInLinks, isLoggedIn }) => {
  return (
    <aside
      id="separator-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-0 sm:translate-x-0 bg-slate-200 "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-slate-400 ">
        <ul className="space-y-2 pb-3">
          {!isLoggedIn &&
            loggedOutLinks.map((link) => (
              <LinkItem link={link} key={link.name} />
            ))}

          {isLoggedIn &&
            loggedInLinks.map((link) => (
              <LinkItem link={link} key={link.name} />
            ))}
        </ul>
        <Search />
      </div>
    </aside>
  );
};

export default AsideItem;
