import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Search.css";
import useSearch from "../../hooks/useSearch"; // Custom hook for search functionality
import useSendRequest from "../../hooks/useSendRequest"; // Custom hook for sending requests

const Search = () => {
  const [searchValue, setSearchValue] = useState(""); // Search input value
  const { searchResults, search, loading, error } = useSearch(); // useSearch hook with loading and error states
  const { sendRequest } = useSendRequest(); // useSendRequest hook for sending requests

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    search(value); // Trigger the search with the new value
  };

  const handleSendRequest = (receiverId) => {
    sendRequest({ receiverId });
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <Link to="/" className="home-link">Home</Link> {/* Add Home Link */}
        <h1 className="search-title">Search Users</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or email..."
          value={searchValue}
          onChange={handleInputChange}
          aria-label="Search Input"
        />
      </div>

      {loading ? (
        <p className="loading-message">Loading results...</p>
      ) : error ? (
        <p className="error-message">Error fetching results. Please try again later.</p>
      ) : (
        <div className="results-container">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div key={result._id} className="result-card">
                <button
                  className="add-button"
                  onClick={() => handleSendRequest(result._id)}
                  aria-label={`Send request to ${result.fullName}`}
                >
                  +
                </button>
                <div className="user-info">
                  <h3 className="user-name">{result.fullName}</h3>
                  <p className="user-email">{result.username}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
