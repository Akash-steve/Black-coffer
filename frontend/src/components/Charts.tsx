import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { Grid, Paper, Typography, Box } from '@mui/material';

interface DataItem {
  end_year: string;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string;
  impact: string;
  added: string;
  published: string;
  country: string;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
}

interface ChartsProps {
  data: DataItem[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Charts: React.FC<ChartsProps> = ({ data }) => {
  // Prepare data for intensity by sector
  const intensityBySector = data.reduce((acc: any, item) => {
    const sector = item.sector || 'Unknown';
    if (!acc[sector]) {
      acc[sector] = { sector, totalIntensity: 0, count: 0 };
    }
    acc[sector].totalIntensity += item.intensity || 0;
    acc[sector].count += 1;
    return acc;
  }, {});

  const sectorData = Object.values(intensityBySector).map((item: any) => ({
    sector: item.sector,
    averageIntensity: item.count > 0 ? item.totalIntensity / item.count : 0,
  }));

  // Prepare data for topics distribution
  const topicCounts = data.reduce((acc: any, item) => {
    const topic = item.topic || 'Unknown';
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});

  const topicData = Object.entries(topicCounts).map(([topic, count]) => ({
    topic,
    count,
  }));

  // Prepare data for likelihood vs relevance
  const likelihoodData = data.map(item => ({
    title: item.title?.substring(0, 30) + '...',
    likelihood: item.likelihood || 0,
    relevance: item.relevance || 0,
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Average Intensity by Sector
          </Typography>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={sectorData.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageIntensity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Topics Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={topicData.slice(0, 8)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ topic, percent }) => `${topic}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {topicData.slice(0, 8).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Likelihood vs Relevance
          </Typography>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={likelihoodData.slice(0, 20)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="likelihood" stroke="#8884d8" />
              <Line type="monotone" dataKey="relevance" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Charts;
