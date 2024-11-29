export const cacheResponse = (key, data, ttl = 3600) => {
    const expiry = Date.now() + ttl * 1000; // time to live in seconds
    const cachedData = { data, expiry };
    localStorage.setItem(key, JSON.stringify(cachedData));
  };
  
  export const getCachedResponse = (key) => {
    const cachedData = localStorage.getItem(key);
    if (!cachedData) return null;
  
    const { data, expiry } = JSON.parse(cachedData);
    if (Date.now() > expiry) {
      localStorage.removeItem(key); // Remove expired data
      return null;
    }
    return data;
  };