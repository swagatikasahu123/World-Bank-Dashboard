

import React, { useEffect, useState } from "react";
import axios from "axios";

const Filters = ({ filters, setFilters }) => {
  const [allCountries, setAllCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  // Fetch countries from backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/countries/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setAllCountries(res.data);
        setLoadingCountries(false);

        // Select all countries by default if none selected
        if (res.data.length && filters.countries.length === 0) {
          setFilters({ ...filters, countries: res.data.map((c) => c.id) });
        }
      } catch (err) {
        console.error("Error fetching countries:", err);
        setLoadingCountries(false);
      }
    };
    if (accessToken) fetchCountries();
  }, [accessToken]);

  const handleCountryChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFilters({ ...filters, countries: value });
  };

  const handleYearChange = (e) => {
    setFilters({ ...filters, [e.target.name]: parseInt(e.target.value) });
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow-md flex gap-6 flex-wrap items-center">
      <div className="flex flex-col">
        <label className="font-semibold mb-1">Countries:</label>
        <select
          multiple
          value={filters.countries}
          onChange={handleCountryChange}
          className="border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300"
        >
          {loadingCountries ? (
            <option>Loading countries...</option>
          ) : (
            allCountries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1">Start Year:</label>
        <input
          type="number"
          name="startYear"
          value={filters.startYear}
          onChange={handleYearChange}
          className="border p-2 rounded w-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1">End Year:</label>
        <input
          type="number"
          name="endYear"
          value={filters.endYear}
          onChange={handleYearChange}
          className="border p-2 rounded w-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
};

export default Filters;
