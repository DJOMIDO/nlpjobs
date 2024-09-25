// src/components/SearchBar.tsx

import React, { useState } from "react";
import "./SearchBar.css";
import Filter from "./Filters";
import { Job } from "../types/jobTypes";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onToggleFilter: () => void;
  isFilterVisible: boolean;
  jobs: Job[];
  filters: {
    country?: string;
    city?: string;
    urgent?: boolean;
  };
  onFilterChange: (filters: {
    country?: string;
    city?: string;
    urgent?: boolean;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onToggleFilter,
  isFilterVisible,
  jobs,
  filters,
  onFilterChange,
}) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <>
      <div className="search-bar">
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          type="text"
          placeholder="Search jobs..."
          value={query}
          onChange={handleInputChange}
        />
        <button className="filter-btn" onClick={onToggleFilter}>
          <span className="material-symbols-outlined">sort</span>
        </button>
      </div>
      {isFilterVisible && (
        <Filter
          jobs={jobs}
          filters={filters}
          onFilterChange={onFilterChange}
          onClose={onToggleFilter}
        />
      )}
    </>
  );
};

export default SearchBar;
