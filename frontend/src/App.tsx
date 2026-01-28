import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import FilterPanel from './components/FilterPanel';
import Charts from './components/Charts';
import axios from 'axios';

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

interface Filters {
  end_year: string;
  topic: string;
  sector: string;
  region: string;
  pestle: string;
  source: string;
  country: string;
  city: string;
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filters, setFilters] = useState<Filters>({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: '',
    city: '',
  });
  const [availableFilters, setAvailableFilters] = useState<any>({});

  useEffect(() => {
    fetchData();
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data', {
        params: filters,
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchFilters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/filters');
      setAvailableFilters(response.data);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Data Visualization Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <FilterPanel
                filters={filters}
                availableFilters={availableFilters}
                onFilterChange={handleFilterChange}
              />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Visualizations
              </Typography>
              <Charts data={data} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
