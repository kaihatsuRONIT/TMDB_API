import './App.css'
import React, { useState, useEffect } from 'react';
import {
  searchMovies, searchTVShows, getPopularMovies,
  getPopularTVShows
} from './services/tmdb';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDialog from './components/MovieDialog';
import FilterDialog from './components/FilterDialog';

const App = () => {
  const [results, setResults] = useState([]);
  const [type, setType] = useState('movie'); // Track the type of results
  const [selectedItem, setSelectedItem] = useState(null); // Track the selected movie/TV show
  const [filters, setFilters] = useState({ genre: '', rating: 0 }); //Track the filter state
  const [filteredResults, setFilteredResults] = useState([]); //Store filtered 
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPopularData = async () => {
      try {
        //At the first loading of our app without any input query, popular data is loaded
        const popularData =
          type === 'movie' ? await getPopularMovies() : await getPopularTVShows();
        setResults(popularData); // Initialize results with popular data
        setFilteredResults(popularData); // Display unfiltered popular data
      } catch (error) {
        console.error('Error fetching popular data:', error);
      }
    };

    fetchPopularData();
  }, [type]);

  const handleShowMore = (movie) => {
    setSelectedItem(movie);// this passes the currently selected movie as prop when showmore button is clicked
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const handleSearch = async (query, searchType) => {
    try {
      //this will handle whether any movie or tvShow is searched
      setType(searchType)
      const results =
        searchType === 'movie'
          ? await searchMovies(query)
          : await searchTVShows(query);
      setResults(results);
      setFilteredResults(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
    const filtered = results.filter((item) => {

      const meetsGenre =
        !newFilters.genre || (item.genre_ids && item.genre_ids.includes(Number(newFilters.genre)));
      //above line will check whether genre provided matches the genreId of any movie with the help of tmdb api
      const meetsRating = item.vote_average >= newFilters.rating;
      return meetsGenre && meetsRating;
    });

    setFilteredResults(filtered);
    setIsFilterDialogOpen(false); // Close the dialog after applying filters
  };
  const handleTypeChange = (e) => {
    setType(e.target.value); // Update type to 'movie' or 'tv'
  };


  return (
    <div>
      <h1>TMDB EXPLORER</h1>
      <SearchBar onSearch={handleSearch} type={type} />
      <div>
        <label>Type: </label>
        <select value={type} onChange={handleTypeChange}>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
      <button onClick={() => setIsFilterDialogOpen(true)}>Filter</button>
      </div>
      {//this helps in opening the filter dialog only when button is clicked
      isFilterDialogOpen && (
        <FilterDialog
          filters={filters}
          type={type}
          onApplyFilter={handleApplyFilter}
          onClose={() => setIsFilterDialogOpen(false)}
        />
      )}
      <MovieList results={filteredResults} type={type} onShowMore={handleShowMore} />
      {//this helps in opening the movie dialog only when showMore button is clicked
      selectedItem && (
        <MovieDialog item={selectedItem} type={type} onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default App;




