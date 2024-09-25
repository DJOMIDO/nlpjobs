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
  onClose: () => void;
}

const Filter: React.FC<FilterProps> = ({
  jobs,
  filters,
  onFilterChange,
  onClose,
}) => {
  const [countryOptions, setCountryOptions] = useState<OptionType[]>([]);
  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [isUrgent, setIsUrgent] = useState(false);

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

  useEffect(() => {
    if (filters.country) {
      const selected = countryOptions.find(
        (option) => option.value === filters.country
      );
      setSelectedCountry(selected || null);
    }
    if (filters.city) {
      const selected = cityOptions.find(
        (option) => option.value === filters.city
      );
      setSelectedCity(selected || null);
    }
    setIsUrgent(!!filters.urgent);
  }, [filters, countryOptions, cityOptions]);

  const handleCountryChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedCountry(selectedOption);
    onFilterChange({ ...filters, country: selectedOption?.value });
  };

  const handleCityChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedCity(selectedOption);
    onFilterChange({ ...filters, city: selectedOption?.value });
  };

  const handleUrgentToggle = () => {
    const newUrgent = !isUrgent;
    setIsUrgent(newUrgent);
    onFilterChange({ ...filters, urgent: newUrgent });
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <span
          className="filter-close-btn material-symbols-outlined"
          onClick={onClose}
        >
          close
        </span>
      </div>
      <div className="filter-item">
        <label>Country:</label>
        <Select
          value={selectedCountry}
          options={countryOptions}
          onChange={handleCountryChange}
          isClearable
        />
      </div>
      <div className="filter-item">
        <label>City:</label>
        <Select
          value={selectedCity}
          options={cityOptions}
          onChange={handleCityChange}
          isClearable
        />
      </div>
      <div className="filter-item">
        <label>Urgent Only:</label>
        <span
          className={`material-symbols-outlined toggle-icon ${
            isUrgent ? "toggle-on" : "toggle-off"
          }`}
          onClick={handleUrgentToggle}
        >
          {isUrgent ? "toggle_on" : "toggle_off"}
        </span>
      </div>
    </div>
  );
};

export default Filter;
