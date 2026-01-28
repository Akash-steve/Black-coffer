'use client';

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
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  ResponsiveContainer,
} from 'recharts';
import { Grid, Paper, Typography, Tabs, Tab, Box } from '@mui/material';

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
  const [currentTab, setCurrentTab] = React.useState(0);

  React.useEffect(() => {
    console.log('Charts component received data:', data.length, 'items');
  }, [data]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Check if data is empty
  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No Data Available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters to see data visualizations
        </Typography>
      </Box>
    );
  }

  // Prepare data for intensity by sector
  const intensityBySector = data.reduce((acc: any, item: DataItem) => {
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
  const topicCounts = data.reduce((acc: any, item: DataItem) => {
    const topic = item.topic || 'Unknown';
    acc[topic] = (acc[topic] || 0) + 1;
    return acc;
  }, {});

  const topicData = Object.entries(topicCounts).map(([topic, count]) => ({
    topic,
    count,
  }));

  // Prepare data for likelihood vs relevance
  const likelihoodData = data.map((item: DataItem) => ({
    title: item.title?.substring(0, 30) + '...',
    likelihood: item.likelihood || 0,
    relevance: item.relevance || 0,
  }));

  // New: Scatter plot data - Intensity vs Likelihood
  const scatterData = data.map((item: DataItem) => ({
    intensity: item.intensity || 0,
    likelihood: item.likelihood || 0,
    sector: item.sector || 'Unknown',
    relevance: item.relevance || 0,
  }));

  // New: Heatmap data - Regional intensity distribution
  const regionData = data.reduce((acc: any, item: DataItem) => {
    const region = item.region || 'Unknown';
    const intensity = item.intensity || 0;
    if (!acc[region]) {
      acc[region] = { region, totalIntensity: 0, count: 0, maxIntensity: 0 };
    }
    acc[region].totalIntensity += intensity;
    acc[region].count += 1;
    acc[region].maxIntensity = Math.max(acc[region].maxIntensity, intensity);
    return acc;
  }, {});

  const heatmapData = Object.values(regionData).map((item: any) => ({
    region: item.region,
    avgIntensity: item.count > 0 ? item.totalIntensity / item.count : 0,
    maxIntensity: item.maxIntensity,
    count: item.count,
  }));

  // New: Area chart data - Year trends
  const yearData = data.reduce((acc: any, item: DataItem) => {
    const year = item.end_year || item.published?.substring(-4) || 'Unknown';
    if (year && year !== 'Unknown' && year !== '') {
      if (!acc[year]) {
        acc[year] = { year, totalIntensity: 0, totalLikelihood: 0, count: 0 };
      }
      acc[year].totalIntensity += item.intensity || 0;
      acc[year].totalLikelihood += item.likelihood || 0;
      acc[year].count += 1;
    }
    return acc;
  }, {});

  const areaData = Object.values(yearData)
    .map((item: any) => ({
      year: item.year,
      avgIntensity: item.count > 0 ? item.totalIntensity / item.count : 0,
      avgLikelihood: item.count > 0 ? item.totalLikelihood / item.count : 0,
    }))
    .sort((a: any, b: any) => a.year.localeCompare(b.year))
    .slice(-10); // Last 10 years

  // New: Radar chart data - PEST analysis
  const pestData = data.reduce((acc: any, item: DataItem) => {
    const pest = item.pestle || 'Unknown';
    if (!acc[pest]) {
      acc[pest] = { pest, intensity: 0, likelihood: 0, relevance: 0, count: 0 };
    }
    acc[pest].intensity += item.intensity || 0;
    acc[pest].likelihood += item.likelihood || 0;
    acc[pest].relevance += item.relevance || 0;
    acc[pest].count += 1;
    return acc;
  }, {});

  const radarData = Object.values(pestData)
    .filter((item: any) => item.pest !== 'Unknown')
    .map((item: any) => ({
      pest: item.pest,
      intensity: item.count > 0 ? item.intensity / item.count : 0,
      likelihood: item.count > 0 ? item.likelihood / item.count : 0,
      relevance: item.count > 0 ? item.relevance / item.count : 0,
    }))
    .slice(0, 6);

  // New: Treemap data - Sector hierarchy
  const treemapData = Object.values(intensityBySector)
    .map((item: any) => ({
      name: item.sector,
      size: item.count,
      intensity: item.totalIntensity,
    }))
    .sort((a: any, b: any) => b.size - a.size)
    .slice(0, 15);

  return (
    <Box>
      <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Overview" />
        <Tab label="Advanced Analysis" />
        <Tab label="Trends & Patterns" />
        <Tab label="Comparative" />
      </Tabs>

      {currentTab === 0 && (
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
                    label={({ topic, percent }: any) => `${topic}: ${(percent * 100).toFixed(0)}%`}
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
      )}

      {currentTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Intensity vs Likelihood Scatter Plot
              </Typography>
              <ResponsiveContainer width="100%" height={320}>
                <ScatterChart data={scatterData.slice(0, 100)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="intensity" name="Intensity" />
                  <YAxis dataKey="likelihood" name="Likelihood" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Data Points" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Regional Intensity Heatmap
              </Typography>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={heatmapData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="region" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="avgIntensity" fill="#ff7300" />
                  <Bar dataKey="maxIntensity" fill="#387908" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                PEST Analysis Radar Chart
              </Typography>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="pest" />
                  <PolarRadiusAxis />
                  <Radar name="Intensity" dataKey="intensity" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Likelihood" dataKey="likelihood" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {currentTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Yearly Trends - Intensity & Likelihood
              </Typography>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={areaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="avgIntensity" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="avgLikelihood" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Sector Hierarchy - Treemap
              </Typography>
              <ResponsiveContainer width="100%" height={320}>
                <Treemap
                  data={treemapData}
                  dataKey="size"
                  aspectRatio={4 / 3}
                  stroke="#fff"
                  fill="#8884d8"
                />
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {currentTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Multi-Metric Comparison
              </Typography>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={sectorData.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sector" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="averageIntensity" fill="#8884d8" name="Avg Intensity" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Regional Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={heatmapData.slice(0, 6)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ region, count }: any) => `${region}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {heatmapData.slice(0, 6).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Topic Frequency Analysis
              </Typography>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={topicData.slice(0, 10)} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="topic" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Charts;
