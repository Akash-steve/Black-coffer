import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

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

interface FilterPanelProps {
  filters: Filters;
  availableFilters: any;
  onFilterChange: (filterName: string, value: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  availableFilters,
  onFilterChange,
}) => {
  const filterFields = [
    { key: 'end_year', label: 'End Year' },
    { key: 'topic', label: 'Topic' },
    { key: 'sector', label: 'Sector' },
    { key: 'region', label: 'Region' },
    { key: 'pestle', label: 'PEST' },
    { key: 'source', label: 'Source' },
    { key: 'country', label: 'Country' },
    { key: 'city', label: 'City' },
  ];

  return (
    <Box>
      {filterFields.map((field) => (
        <Box key={field.key} sx={{ mb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={filters[field.key as keyof Filters] || ''}
              label={field.label}
              onChange={(e) => onFilterChange(field.key, e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {availableFilters[`${field.key}s`]?.map((item: string) => (
                <MenuItem key={item} value={item}>
                  {item || 'None'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
    </Box>
  );
};

export default FilterPanel;
