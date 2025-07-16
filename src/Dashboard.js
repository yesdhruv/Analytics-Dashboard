import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, Users, Activity, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('engagement');

  // Sample data for charts
  const dauData = [
    { date: '2025-07-01', DAU: 18500, WAU: 92000, growth: 15, south: 7400, north: 5550, west: 3700, east: 1850 },
    { date: '2025-07-02', DAU: 22000, growth: 19, south: 8800, north: 6600, west: 4400, east: 2200 },
    { date: '2025-07-03', DAU: 21500, growth: 17, south: 8600, north: 6450, west: 4300, east: 2150 },
    { date: '2025-07-04', DAU: 19800, growth: 12, south: 7920, north: 5940, west: 3960, east: 1980 },
    { date: '2025-07-05', DAU: 23500, growth: 21, south: 9400, north: 7050, west: 4700, east: 2350 },
    { date: '2025-07-06', DAU: 14000, growth: -8, south: 5600, north: 4200, west: 2800, east: 1400 },
    { date: '2025-07-07', DAU: 15200, growth: -5, south: 6080, north: 4560, west: 3040, east: 1520 }
  ];

  const featureAdoption = [
    { feature: 'GST Filing', july: 68, june: 56, delta: 12, south: 75, east: 58 },
    { feature: 'UPI Payments', july: 55, june: 53, delta: 2, south: 60, east: 48 },
    { feature: 'Regional UI', july: 42, june: 17, delta: 25, south: 35, east: 62 },
    { feature: 'Tally Integration', july: 60, june: 52, delta: 8, south: 68, east: 45 }
  ];

  const retentionData = [
    { region: 'South', mayCohort: 32, juneCohort: 35, gap: 3 },
    { region: 'North', mayCohort: 26, juneCohort: 28, gap: 2 },
    { region: 'West', mayCohort: 30, juneCohort: 32, gap: 2 },
    { region: 'East', mayCohort: 21, juneCohort: 23, gap: 2 }
  ];

  const funnelData = [
    { stage: 'Account Creation', users: 10000, conversion: 100, dropoff: 0, revenueLoss: 0 },
    { stage: 'Bot Configuration', users: 6500, conversion: 65, dropoff: 35, revenueLoss: 735000 },
    { stage: 'API Integration', users: 4500, conversion: 45, dropoff: 20, revenueLoss: 420000 },
    { stage: 'First Test', users: 2800, conversion: 28, dropoff: 72, revenueLoss: 1512000 }
  ];

  const feedbackData = [
    { feature: 'GST Filing', rating: 2.8, volume: 45, negativePercent: 68, topComplaint: 'PAN-GST linking fails' },
    { feature: 'API Integration', rating: 3.1, volume: 30, negativePercent: 55, topComplaint: 'Too many steps' },
    { feature: 'Regional UI', rating: 4.2, volume: 15, negativePercent: 12, topComplaint: 'Need Odia language' }
  ];

  const negativeFeedbackPie = [
    { name: 'GST Issues', value: 45, color: '#ff4444' },
    { name: 'API Errors', value: 30, color: '#ff8844' },
    { name: 'Language', value: 15, color: '#ffaa44' },
    { name: 'Other', value: 10, color: '#44aa44' }
  ];

  const radarData = featureAdoption.map(item => ({
    feature: item.feature,
    adoption: item.july,
    growth: item.delta * 2
  }));

  const MetricCard = ({ title, value, change, icon: Icon, color = "blue" }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={`flex items-center mt-1 text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {Math.abs(change)}% MoM
            </div>
          )}
        </div>
        <Icon className={`h-8 w-8 text-${color}-500`} />
      </div>
    </div>
  );

  const RegionCard = ({ region, retention, isAlert = false }) => (
    <div className={`p-4 rounded-lg border-2 ${isAlert ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-700">{region}</h4>
        {isAlert && <AlertCircle className="h-5 w-5 text-red-500" />}
      </div>
      <p className="text-xl font-bold mt-2">{retention}%</p>
      <p className="text-sm text-gray-600">June Cohort</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('engagement')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'engagement'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Engagement & Retention
              </button>
              <button
                onClick={() => setActiveTab('funnel')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'funnel'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Funnel & Feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'engagement' ? (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Daily Active Users"
                value="18.5K"
                change={15}
                icon={Users}
                color="blue"
              />
              <MetricCard
                title="Weekly Active Users"
                value="92K"
                change={12}
                icon={Activity}
                color="green"
              />
              <MetricCard
                title="South India Growth"
                value="40%"
                change={8}
                icon={TrendingUp}
                color="purple"
              />
            </div>

            {/* DAU/WAU Trend */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">DAU/WAU Trend</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={dauData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="DAU" stroke="#3b82f6" strokeWidth={3} name="Daily Active Users" />
                  <Line type="monotone" dataKey="south" stroke="#10b981" strokeWidth={2} name="South Region" />
                  <Line type="monotone" dataKey="north" stroke="#f59e0b" strokeWidth={2} name="North Region" />
                  <Line type="monotone" dataKey="west" stroke="#ef4444" strokeWidth={2} name="West Region" />
                  <Line type="monotone" dataKey="east" stroke="#8b5cf6" strokeWidth={2} name="East Region" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Feature Adoption */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Feature Adoption Radar</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="feature" />
                    <PolarRadiusAxis angle={90} domain={[0, 80]} />
                    <Radar name="Adoption %" dataKey="adoption" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Feature Adoption Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={featureAdoption}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="feature" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="july" fill="#3b82f6" name="July %" />
                    <Bar dataKey="june" fill="#93c5fd" name="June %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Retention Heatmap */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Regional Retention Analysis</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <RegionCard region="South" retention={35} />
                <RegionCard region="North" retention={28} />
                <RegionCard region="West" retention={32} />
                <RegionCard region="East" retention={23} isAlert={true} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Funnel Analysis */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Onboarding Funnel</h3>
              <div className="flex items-center justify-between mb-6">
                {funnelData.map((stage, index) => (
                  <div key={stage.stage} className="flex items-center">
                    <div className={`p-4 rounded-lg text-center ${
                      stage.conversion < 30 ? 'bg-red-100 border-2 border-red-500' : 'bg-blue-100 border-2 border-blue-500'
                    }`}>
                      <p className="text-sm font-medium text-gray-700">{stage.stage}</p>
                      <p className="text-xl font-bold">{stage.users.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{stage.conversion}%</p>
                    </div>
                    {index < funnelData.length - 1 && <ArrowRight className="h-6 w-6 mx-4 text-gray-400" />}
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Revenue Impact Analysis</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={funnelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <Bar dataKey="revenueLoss" fill="#ef4444" name="Revenue Loss (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Feedback Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Negative Feedback Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={negativeFeedbackPie}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {negativeFeedbackPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Feature Feedback Overview</h3>
                <div className="space-y-4">
                  {feedbackData.map((item, index) => (
                    <div key={index} className="border-l-4 border-gray-200 pl-4 py-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.feature}</h4>
                          <p className="text-sm text-gray-600 mt-1">"{item.topComplaint}"</p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.rating >= 4 ? 'bg-green-100 text-green-800' :
                            item.rating >= 3 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {item.rating}/5
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.negativePercent}% negative</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;