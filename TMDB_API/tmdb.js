import axios from 'axios';
import { cacheResponse, getCachedResponse } from './src/services/cache'; // Import caching utilities
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
//now to access any api from tmdb we have to follow some convention:- "${BASE_URL}{your_request}?api_key=${API_KEY}&query=${query}"

export const searchMovies = async (query) => {
    try {
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
    } catch (error) {
        if (error.response) {
            // Check for rate limit exceeded (429)
            if (error.response.status === 429) {
                console.error('Rate limit exceeded');
                alert('Error: You have exceeded the rate limit. Please try again later.');
            }
            // Check for invalid API key (401 Unauthorized)
            else if (error.response.status === 401) {
                console.error('Invalid API key');
                alert('Error: Invalid API key. Please check your TMDB API key.');
            }
            // Handle other potential errors
            else {
                console.error('API Error:', error.response.data.status_message);
                alert(`Error: ${error.response.data.status_message}`);
            }
        } else {
            // Handle network or other unknown errors
            console.error('Network Error:', error.message);
            alert('Network Error: Please check your internet connection.');
        }
    }
};

export const getMovieCredits = async (movieId) => {
    try {
        const cacheKey = `movieCredits_${movieId}`;
        const cachedData = getCachedResponse(cacheKey);
        if (cachedData) return cachedData;
        const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
        const response = await axios.get(url);
        const data = response.data.cast; // Returns only the cast array
        cacheResponse(cacheKey, data, 3600); // Cache for 1 hour
        return data;
    } catch (error) {
        if (error.response) {
            // Check for rate limit exceeded (429)
            if (error.response.status === 429) {
                console.error('Rate limit exceeded');
                alert('Error: You have exceeded the rate limit. Please try again later.');
            }
            // Check for invalid API key (401 Unauthorized)
            else if (error.response.status === 401) {
                console.error('Invalid API key');
                alert('Error: Invalid API key. Please check your TMDB API key.');
            }
            // Handle other potential errors
            else {
                console.error('API Error:', error.response.data.status_message);
                alert(`Error: ${error.response.data.status_message}`);
            }
        } else {
            // Handle network or other unknown errors
            console.error('Network Error:', error.message);
            alert('Network Error: Please check your internet connection.');
        }
    }
};
export const searchTVShows = async (query) => {
    try {
        const cacheKey = `searchTVShows_${query}`;
        const cachedData = getCachedResponse(cacheKey);
        if (cachedData) return cachedData;
        const url = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`;
        const response = await axios.get(url);
        const data = response.data.results;
        cacheResponse(cacheKey, data, 3600);
        return data;
    } catch (error) {
        if (error.response) {
            // Check for rate limit exceeded (429)
            if (error.response.status === 429) {
                console.error('Rate limit exceeded');
                alert('Error: You have exceeded the rate limit. Please try again later.');
            }
            // Check for invalid API key (401 Unauthorized)
            else if (error.response.status === 401) {
                console.error('Invalid API key');
                alert('Error: Invalid API key. Please check your TMDB API key.');
            }
            // Handle other potential errors
            else {
                console.error('API Error:', error.response.data.status_message);
                alert(`Error: ${error.response.data.status_message}`);
            }
        } else {
            // Handle network or other unknown errors
            console.error('Network Error:', error.message);
            alert('Network Error: Please check your internet connection.');
        }
    }
};

export const getTVCredits = async (tvId) => {
    try {
        const cacheKey = `tvCredits_${tvId}`;
        const cachedData = getCachedResponse(cacheKey);
        if (cachedData) return cachedData;

        const url = `${BASE_URL}/tv/${tvId}/credits?api_key=${API_KEY}`;
        const response = await axios.get(url);
        const data = response.data.cast;

        cacheResponse(cacheKey, data, 3600); // Cache for 1 hour
        return data;
    } catch (error) {
        if (error.response) {
            // Check for rate limit exceeded (429)
            if (error.response.status === 429) {
                console.error('Rate limit exceeded');
                alert('Error: You have exceeded the rate limit. Please try again later.');
            }
            // Check for invalid API key (401 Unauthorized)
            else if (error.response.status === 401) {
                console.error('Invalid API key');
                alert('Error: Invalid API key. Please check your TMDB API key.');
            }
            // Handle other potential errors
            else {
                console.error('API Error:', error.response.data.status_message);
                alert(`Error: ${error.response.data.status_message}`);
            }
        } else {
            // Handle network or other unknown errors
            console.error('Network Error:', error.message);
            alert('Network Error: Please check your internet connection.');
        }
    }
};
export const getVideos = async (id, type) => {
    try {
        const cacheKey = `videos_${type}_${id}`;
        const cachedData = getCachedResponse(cacheKey);
        if (cachedData) return cachedData;
        const url = `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`;
        const response = await axios.get(url);
        const data = response.data.results;
        cacheResponse(cacheKey, data, 3600); // Cache for 1 hour
        return data;
    } catch (error) {
        if (error.response) {
            // Check for rate limit exceeded (429)
            if (error.response.status === 429) {
                console.error('Rate limit exceeded');
                alert('Error: You have exceeded the rate limit. Please try again later.');
            }
            // Check for invalid API key (401 Unauthorized)
            else if (error.response.status === 401) {
                console.error('Invalid API key');
                alert('Error: Invalid API key. Please check your TMDB API key.');
            }
            // Handle other potential errors
            else {
                console.error('API Error:', error.response.data.status_message);
                alert(`Error: ${error.response.data.status_message}`);
            }
        } else {
            // Handle network or other unknown errors
            console.error('Network Error:', error.message);
            alert('Network Error: Please check your internet connection.');
        }
    }
};
export const getGenres = async (type) => {
    try {
        const cacheKey = 'genres';
        const cachedData = getCachedResponse(cacheKey);
        if (cachedData) return cachedData;
        const url = `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}`;
        const response = await axios.get(url);
        const data = response.data.genres; // Returns an array of genres
        cacheResponse(cacheKey, data, 3600);
        return data;
    } catch (error) {
        if (error.response) {
            // Check for rate limit exceeded (429)
            if (error.response.status === 429) {
                console.error('Rate limit exceeded');
                alert('Error: You have exceeded the rate limit. Please try again later.');
            }
            // Check for invalid API key (401 Unauthorized)
            else if (error.response.status === 401) {
                console.error('Invalid API key');
                alert('Error: Invalid API key. Please check your TMDB API key.');
            }
            // Handle other potential errors
            else {
                console.error('API Error:', error.response.data.status_message);
                alert(`Error: ${error.response.data.status_message}`);
            }
        } else {
            // Handle network or other unknown errors
            console.error('Network Error:', error.message);
            alert('Network Error: Please check your internet connection.');
        }
    }
};
export const getPopularMovies = async () => {
    try {
        const cacheKey = 'popularMovies';
        const cachedData = getCachedResponse(cacheKey);
        if (cachedData) return cachedData; // Return cached data if available

        const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
        const response = await axios.get(url);
        const data = response.data.results;

        cacheResponse(cacheKey, data, 3600); // Cache for 1 hour
        return data;
    } catch (error) {
        if (error.response) {
            // Check for rate limit exceeded (429)
            if (error.response.status === 429) {
                console.error('Rate limit exceeded');
                alert('Error: You have exceeded the rate limit. Please try again later.');
            }
            // Check for invalid API key (401 Unauthorized)
            else if (error.response.status === 401) {
                console.error('Invalid API key');
                alert('Error: Invalid API key. Please check your TMDB API key.');
            }
            // Handle other potential errors
            else {
                console.error('API Error:', error.response.data.status_message);
                alert(`Error: ${error.response.data.status_message}`);
            }
        } else {
            // Handle network or other unknown errors
            console.error('Network Error:', error.message);
            alert('Network Error: Please check your internet connection.');
        }
    }
};

export const getPopularTVShows = async () => {
    try {
        const cacheKey = 'popularTVShows';
        const cachedData = getCachedResponse(cacheKey);
        if (cachedData) return cachedData;

        const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}`;
        const response = await axios.get(url);
        const data = response.data.results;

        cacheResponse(cacheKey, data, 3600);
        return data;
    } catch (error) {
        if (error.response) {
            // Check for rate limit exceeded (429)
            if (error.response.status === 429) {
                console.error('Rate limit exceeded');
                alert('Error: You have exceeded the rate limit. Please try again later.');
            }
            // Check for invalid API key (401 Unauthorized)
            else if (error.response.status === 401) {
                console.error('Invalid API key');
                alert('Error: Invalid API key. Please check your TMDB API key.');
            }
            // Handle other potential errors
            else {
                console.error('API Error:', error.response.data.status_message);
                alert(`Error: ${error.response.data.status_message}`);
            }
        } else {
            // Handle network or other unknown errors
            console.error('Network Error:', error.message);
            alert('Network Error: Please check your internet connection.');
        }
    }
};

