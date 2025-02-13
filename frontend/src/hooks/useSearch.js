import { useState } from "react";

const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);

  const search = async (query) => {
    try {
      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return { searchResults, search };
};

export default useSearch;
