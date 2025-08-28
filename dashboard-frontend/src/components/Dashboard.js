import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";

// Chart.js modules
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [population, setPopulation] = useState({});
  const [gdp, setGdp] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    countries: ["IND", "USA"],
    startYear: 2000,
    endYear: 2020,
  });

  const accessToken = localStorage.getItem("accessToken");

  const fetchData = async () => {
    if (!accessToken) return;

    try {
      const countriesParam = filters.countries.join(",");
      const popRes = await axios.get(
        `http://127.0.0.1:8000/api/population/?countries=${countriesParam}&start_year=${filters.startYear}&end_year=${filters.endYear}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setPopulation(popRes.data);

      const gdpRes = await axios.get(
        `http://127.0.0.1:8000/api/gdp/?countries=${countriesParam}&start_year=${filters.startYear}&end_year=${filters.endYear}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setGdp(gdpRes.data);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (!accessToken)
    return <p className="text-red-500 font-semibold mt-10 text-center">Please login.</p>;
  if (loading) return <p className="text-blue-500 mt-10 text-center">Loading data...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">World Bank Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded shadow transition"
        >
          Logout
        </button>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Population Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Population Data</h2>
          <Bar
            data={{
              labels:
                Object.keys(population)[0] && population[Object.keys(population)[0]]
                  ? population[Object.keys(population)[0]].map((d) => d.year)
                  : [],
              datasets: Object.keys(population).map((c, idx) => ({
                label: c,
                data: population[c].map((d) => d.value),
                backgroundColor:
                  idx % 2 === 0
                    ? "rgba(54, 162, 235, 0.6)"
                    : "rgba(255, 99, 132, 0.6)",
              })),
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </div>

        {/* GDP Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">GDP per Capita</h2>
          <Line
            data={{
              labels:
                Object.keys(gdp)[0] && gdp[Object.keys(gdp)[0]]
                  ? gdp[Object.keys(gdp)[0]].map((d) => d.year)
                  : [],
              datasets: Object.keys(gdp).map((c, idx) => ({
                label: c,
                data: gdp[c].map((d) => d.value),
                borderColor:
                  idx % 2 === 0
                    ? "rgba(75,192,192,1)"
                    : "rgba(153,102,255,1)",
                fill: false,
              })),
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
