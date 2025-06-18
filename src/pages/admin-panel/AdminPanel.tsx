import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGeneratedSites: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/stats`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Prepare chart data
  const barChartData = [
    {
      name: "Users",
      value: stats?.totalUsers,
    },
    {
      name: "Generated Sites",
      value: stats?.totalGeneratedSites,
    },
  ];

  const pieChartData = [
    { name: "Users", value: stats?.totalUsers },
    { name: "Generated Sites", value: stats?.totalGeneratedSites },
  ];

  const COLORS = ["#6b46c1", "#d53f8c"]; // Purple and Pink

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Total Users
            </h3>
            <p className="text-4xl font-bold text-purple-400">
              {stats?.totalUsers}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20">
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Generated Sites
            </h3>
            <p className="text-4xl font-bold text-pink-400">
              {stats?.totalGeneratedSites}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Usage Statistics
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="name" stroke="#a0aec0" />
                  <YAxis stroke="#a0aec0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a202c",
                      borderColor: "#4a5568",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name="Count"
                    fill="#6b46c1"
                    radius={[4, 4, 0, 0]}
                  >
                    {barChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a202c",
                      borderColor: "#4a5568",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
