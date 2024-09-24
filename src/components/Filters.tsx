// src/components/Filter.tsx

import React, { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { Job } from "../types/jobTypes";
import "./Filters.css";

interface OptionType {
  value: string;
  label: string;
}

interface FilterProps {
  jobs: Job[];
  onFilterChange: (filters: {
    country?: string;
    city?: string;
    urgent?: boolean;
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ jobs, onFilterChange }) => {
  const [countryOptions, setCountryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const uniqueCountries = Array.from(
      new Set(jobs.map((job) => job.location.country))
    );
    const uniqueCities = Array.from(
      new Set(jobs.map((job) => job.location.city))
    );

    setCountryOptions(
      uniqueCountries.map((country) => ({ value: country, label: country }))
    );
    setCityOptions(uniqueCities.map((city) => ({ value: city, label: city })));
  }, [jobs]);

  const handleCountryChange = (selectedOption: SingleValue<OptionType>) => {
    onFilterChange({ country: selectedOption?.value });
  };

  const handleCityChange = (selectedOption: SingleValue<OptionType>) => {
    onFilterChange({ city: selectedOption?.value });
  };

  const handleUrgentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ urgent: e.target.checked });
  };

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label>Country:</label>
        <Select
          options={countryOptions}
          onChange={handleCountryChange}
          isClearable
        />
      </div>
      <div className="filter-item">
        <label>City:</label>
        <Select
          options={cityOptions}
          onChange={handleCityChange}
          isClearable
        />
      </div>
      <div className="filter-item">
        <label>Urgent Only:</label>
        <input type="checkbox" onChange={handleUrgentChange} title="Urgent Only" />
      </div>
    </div>
  );
};

export default Filter;
