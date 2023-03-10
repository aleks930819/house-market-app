import { useDispatch } from 'react-redux';
import { SET_SEARCH_RESULT } from '../slices/searchQuerySlice';

import algoliasearch from 'algoliasearch/lite';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as config from '../../config.js';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    async function search() {
      const searchClient = algoliasearch(
        config.REACT_APP_ALOGLIA_APP_ID,
        config.REACT_APP_ALGOLIA_SEARCH_API_KEY
      );
      const index = searchClient.initIndex('listings');
      const { hits } = await index.search(searchQuery);

      dispatch(SET_SEARCH_RESULT(hits));
    }

    search();

    setSearchQuery('');
    navigate('/search');
  };

  return (
    <div className="">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2  w-full rounded-md outline-none sm:w-48 sm:focus:w-80  transition-all duration-400 ease-in-out shadow-lg text-xs sm:text-sm mt-5 sm:mt-0"
        />
      </form>
    </div>
  );
};

export default Search;
