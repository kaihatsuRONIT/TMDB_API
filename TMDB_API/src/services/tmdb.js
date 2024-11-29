import axios from 'axios';
import { cacheResponse, getCachedResponse } from './cache'; // Import caching utilities
const API_KEY = "0482da0c35e12134c74c1e3b39b44826";
//having issues with .env files so stored the api key here
const BASE_URL = 'https://api.themoviedb.org/3';
//now to access any api from tmdb we have to follow some convention:- "${BASE_URL}{your_request}?api_key=${API_KEY}&query=${query}"

export const searchMovies = async (query) => {
    //with cache key, stored the data temporarily in local storage
    const cacheKey = `searchMovies_${query}`;
    const cachedData = getCachedResponse(cacheKey);
    if (cachedData) return cachedData;

    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
    const response = await axios.get(url);
    console.log(response.data.results)
    const data = response.data.results;

    cacheResponse(cacheKey, data, 3600);
    return data;
};

export const getMovieCredits = async (movieId) => {
    const cacheKey = `movieCredits_${movieId}`;
    const cachedData = getCachedResponse(cacheKey);
    if (cachedData) return cachedData;
    const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data.cast; // Returns only the cast array
    cacheResponse(cacheKey, data, 3600); // Cache for 1 hour
    return data;
};
export const searchTVShows = async (query) => {
    const cacheKey = `searchTVShows_${query}`;
    const cachedData = getCachedResponse(cacheKey);
    if (cachedData) return cachedData;
    const url = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`;
    const response = await axios.get(url);
    const data = response.data.results;
    cacheResponse(cacheKey, data, 3600);
    return data;
};

export const getTVCredits = async (tvId) => {
    const cacheKey = `tvCredits_${tvId}`;
    const cachedData = getCachedResponse(cacheKey);
    if (cachedData) return cachedData;

    const url = `${BASE_URL}/tv/${tvId}/credits?api_key=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data.cast;

    cacheResponse(cacheKey, data, 3600); // Cache for 1 hour
    return data;
};
export const getVideos = async (id, type) => {
    const cacheKey = `videos_${type}_${id}`;
    const cachedData = getCachedResponse(cacheKey);
    if (cachedData) return cachedData;
    const url = `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data.results;
    cacheResponse(cacheKey, data, 3600); // Cache for 1 hour
    return data;
};
export const getGenres = async (type) => {
    const cacheKey = 'genres';
    const cachedData = getCachedResponse(cacheKey);
    if (cachedData) return cachedData;
    const url = `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data.genres; // Returns an array of genres
    cacheResponse(cacheKey, data, 3600);
    return data;
};
export const getPopularMovies = async () => {
    const cacheKey = 'popularMovies';
    const cachedData = getCachedResponse(cacheKey);
    if (cachedData) return cachedData; // Return cached data if available

    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data.results;

    cacheResponse(cacheKey, data, 3600); // Cache for 1 hour
    return data;
};

export const getPopularTVShows = async () => {
    const cacheKey = 'popularTVShows';
    const cachedData = getCachedResponse(cacheKey);
    if (cachedData) return cachedData;

    const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data.results;

    cacheResponse(cacheKey, data, 3600);
    return data;
};

