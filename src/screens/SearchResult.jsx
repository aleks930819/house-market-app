import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  selectSearchResult,
  SET_SEARCH_RESULT_TO_EMPTY,
} from '../slices/searchQuerySlice';

import Card from '../components/Card';
import Container from '../components/Container';

const SearchResult = () => {
  const listings = useSelector(selectSearchResult);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(SET_SEARCH_RESULT_TO_EMPTY());
    };
  }, [dispatch]);

  if (listings.length === 0) {
    return (
      <Container>
        <h2>No Results</h2>
      </Container>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="pt-10  text-center md:text-lg pb-10">Results:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mx-auto  place-items-center">
        {listings?.map((item) => (
          <Card item={item} key={item?.objectID} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
