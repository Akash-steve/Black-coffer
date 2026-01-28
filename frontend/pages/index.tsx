import { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography, useTheme } from '@mui/material';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import FilterPanel from '../components/FilterPanel';
import Charts from '../components/Charts';
import AnalyticsCards from '../components/AnalyticsCards';
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

export default function Home() {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
      console.log('Fetching data with filters:', filters);
      const response = await axios.get('http://localhost:5000/api/data', {
        params: filters,
      });
      console.log('Received data:', response.data.length, 'items');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchFilters = async () => {
    try {
      console.log('Fetching filters...');
      const response = await axios.get('http://localhost:5000/api/filters');
      console.log('Received filters:', response.data);
      setAvailableFilters(response.data);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev: Filters) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(!sidebarOpen)} />
      
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          marginLeft: sidebarOpen ? '280px' : '80px',
          transition: theme => theme.transitions.create('margin-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <Box 
          sx={{ 
            p: 3, 
            flexGrow: 1,
            marginTop: '64px', // Height of TopBar
            maxWidth: `calc(100vw - ${sidebarOpen ? '280px' : '80px'})`,
            overflowX: 'hidden',
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#2c2c3e' }}>
            Analytics Dashboard
          </Typography>
          
          <AnalyticsCards data={data} />
          
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, height: 'fit-content' }}>
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
                  Data Visualizations
                </Typography>
                <Charts data={data} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
