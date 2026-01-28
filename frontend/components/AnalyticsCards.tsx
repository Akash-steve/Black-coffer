'use client';

import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  ShoppingCart,
  AttachMoney,
  Support,
  Flag,
  Email,
  TouchApp,
  Visibility,
  PersonAdd,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AnalyticsCardsProps {
  data: any[];
}

const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ data }) => {
  // Calculate metrics from data
  const totalRecords = data.length;
  
  // Check if data is empty
  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No Data Available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters to see analytics cards
        </Typography>
      </Box>
    );
  }

  const avgIntensity = data.reduce((sum, item) => sum + (item.intensity || 0), 0) / totalRecords || 0;
  const avgLikelihood = data.reduce((sum, item) => sum + (item.likelihood || 0), 0) / totalRecords || 0;
  const avgRelevance = data.reduce((sum, item) => sum + (item.relevance || 0), 0) / totalRecords || 0;

  // Sample data for charts
  const weeklyData = [
    { week: 'Week 1', sales: 4000, visits: 2400 },
    { week: 'Week 2', sales: 3000, visits: 1398 },
    { week: 'Week 3', sales: 2000, visits: 9800 },
    { week: 'Week 4', sales: 2780, visits: 3908 },
  ];

  const countryData = [
    { country: 'USA', sales: 8500, change: '+12.5%', flag: '🇺🇸' },
    { country: 'Brazil', sales: 2400, change: '+8.2%', flag: '🇧🇷' },
    { country: 'India', sales: 894, change: '-2.1%', flag: '🇮🇳' },
    { country: 'Australia', sales: 740, change: '+5.3%', flag: '🇦🇺' },
    { country: 'France', sales: 450, change: '+1.8%', flag: '🇫🇷' },
    { country: 'China', sales: 2000, change: '+15.7%', flag: '🇨🇳' },
  ];

  const campaignData = [
    { metric: 'Impressions', value: 12345, icon: <Visibility />, color: '#7c3aed' },
    { metric: 'Opened', value: 8734, icon: <Email />, color: '#10b981' },
    { metric: 'Clicked', value: 267, icon: <TouchApp />, color: '#f59e0b' },
    { metric: 'Subscribe', value: 343, icon: <PersonAdd />, color: '#3b82f6' },
    { metric: 'Complaints', value: 10, icon: <Support />, color: '#ef4444' },
    { metric: 'Unsubscribe', value: 0, icon: <TrendingDown />, color: '#6b7280' },
  ];

  return (
    <Grid container spacing={3} sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      {/* Website Analytics Card */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: 200, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Website Analytics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Traffic
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  1.5K
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Page Views
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  2.5K
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Leads
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  1.2%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Conversions
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  12%
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Average Daily Sales Card */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: 200 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Average Daily Sales
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="primary">
              ${avgLikelihood.toFixed(0)}K
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Total Sales This Month
            </Typography>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={weeklyData}>
                <Line type="monotone" dataKey="sales" stroke="#7c3aed" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Sales Overview Card */}
      <Grid item xs={12} md={4}>
        <Card sx={{ height: 200 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Sales Overview
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                ${avgIntensity.toFixed(1)}k
              </Typography>
              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', color: 'success.main' }}>
                <TrendingUp fontSize="small" />
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  +18.2%
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">Order</Typography>
                <Typography variant="body2" fontWeight="bold">62.2%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={62.2} sx={{ height: 8, borderRadius: 4 }} />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">Visits</Typography>
                <Typography variant="body2" fontWeight="bold">25.5%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={25.5} sx={{ height: 8, borderRadius: 4 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Earning Reports Card */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: 250 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Earning Reports
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" fontWeight="bold">
                ${avgRelevance.toFixed(0)}
              </Typography>
              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', color: 'error.main' }}>
                <TrendingDown fontSize="small" />
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  -4.2%
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Weekly Earnings Overview
            </Typography>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="sales" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Support Tracker Card */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: 250 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Support Tracker
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Last 7 Days
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {totalRecords} Total Tickets
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: '#7c3aed', mx: 'auto', mb: 1 }}>
                    <Support />
                  </Avatar>
                  <Typography variant="h6">142</Typography>
                  <Typography variant="body2" color="text.secondary">New Tickets</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: '#10b981', mx: 'auto', mb: 1 }}>
                    <TrendingUp />
                  </Avatar>
                  <Typography variant="h6">16</Typography>
                  <Typography variant="body2" color="text.secondary">Open Tickets</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar sx={{ bgcolor: '#f59e0b', mx: 'auto', mb: 1 }}>
                      <People />
                    </Avatar>
                  </Box>
                  <Typography variant="h6">1 Day</Typography>
                  <Typography variant="body2" color="text.secondary">Response Time</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Sales by Countries Card */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Sales by Countries
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Monthly Sales Overview
            </Typography>
            {countryData.map((country) => (
              <Box key={country.country} sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                <Typography variant="body1" sx={{ mr: 2, fontSize: '1.5rem' }}>
                  {country.flag}
                </Typography>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight="bold" noWrap>
                    {country.country}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${country.sales.toLocaleString()}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: country.change.startsWith('+') ? 'success.main' : 'error.main',
                    fontWeight: 'bold',
                    flexShrink: 0,
                  }}
                >
                  {country.change}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Monthly Campaign Status Card */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Monthly Campaign Status
            </Typography>
            <Grid container spacing={2}>
              {campaignData.map((campaign) => (
                <Grid item xs={6} key={campaign.metric}>
                  <Card sx={{ p: 2, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: campaign.color, mx: 'auto', mb: 1 }}>
                      {campaign.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" noWrap>
                      {campaign.value.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {campaign.metric}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AnalyticsCards;
