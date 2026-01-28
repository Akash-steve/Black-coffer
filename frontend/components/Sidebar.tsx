'use client';

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  Avatar,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Dashboard,
  Analytics,
  Assessment,
  TrendingUp,
  People,
  ShoppingCart,
  Settings,
  Help,
  Search,
  Menu,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const menuItems = [
    { text: 'Dashboards', icon: <Dashboard />, badge: null },
    { 
      text: 'Analytics', 
      icon: <Analytics />, 
      badge: '4',
      subItems: ['Data Analysis', 'Reports', 'Metrics', 'Insights']
    },
    { text: 'CRM', icon: <People />, badge: null },
    { text: 'eCommerce', icon: <ShoppingCart />, badge: null },
    { text: 'Projects', icon: <Assessment />, badge: null },
    { text: 'Support', icon: <Help />, badge: null },
    { text: 'Settings', icon: <Settings />, badge: null },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          whiteSpace: 'nowrap',
          width: open ? 280 : 80,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          backgroundColor: '#2c2c3e',
          color: '#fff',
          borderRight: 'none',
          overflowX: 'hidden',
          zIndex: theme.zIndex.drawer - 1,
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {open ? (
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#7c3aed' }}>
            VU<span style={{ color: '#fff' }}>EXY</span>
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#7c3aed' }}>
            V
          </Typography>
        )}
        <Menu sx={{ color: '#fff', cursor: 'pointer' }} onClick={onClose} />
      </Box>

      {open && (
        <Box sx={{ px: 2, mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: <Search sx={{ color: '#9ca3af', mr: 1 }} />,
              sx: {
                backgroundColor: alpha('#fff', 0.1),
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& input': {
                  color: '#fff',
                  '&::placeholder': {
                    color: '#9ca3af',
                  },
                },
              },
            }}
          />
        </Box>
      )}

      <Divider sx={{ borderColor: alpha('#fff', 0.1) }} />

      <List sx={{ flex: 1, py: 1 }}>
        {menuItems.map((item) => (
          <Box key={item.text}>
            <ListItem
              button
              sx={{
                mx: 1,
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: item.text === 'Analytics' ? alpha('#7c3aed', 0.2) : 'transparent',
                '&:hover': {
                  backgroundColor: alpha('#fff', 0.1),
                },
                '& .MuiListItemIcon-root': {
                  color: item.text === 'Analytics' ? '#7c3aed' : '#9ca3af',
                },
                '& .MuiListItemText-primary': {
                  color: item.text === 'Analytics' ? '#fff' : '#9ca3af',
                  fontWeight: item.text === 'Analytics' ? 'bold' : 'normal',
                },
              }}
              onClick={() => item.text === 'Analytics' && setAnalyticsOpen(!analyticsOpen)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && (
                <>
                  <ListItemText primary={item.text} />
                  {item.badge && (
                    <Box
                      sx={{
                        backgroundColor: '#7c3aed',
                        color: '#fff',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.badge}
                    </Box>
                  )}
                  {item.subItems && (analyticsOpen ? <ExpandLess /> : <ExpandMore />)}
                </>
              )}
            </ListItem>
            
            {open && item.subItems && analyticsOpen && (
              <List sx={{ pl: 4 }}>
                {item.subItems.map((subItem) => (
                  <ListItem
                    key={subItem}
                    button
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      '&:hover': {
                        backgroundColor: alpha('#fff', 0.05),
                      },
                      '& .MuiListItemText-primary': {
                        color: '#9ca3af',
                        fontSize: '0.875rem',
                      },
                    }}
                  >
                    <ListItemText primary={subItem} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
      </List>

      {open && (
        <Box sx={{ p: 2, borderTop: `1px solid ${alpha('#fff', 0.1)}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 32, height: 32, backgroundColor: '#7c3aed' }}>
              AK
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 'bold' }}>
                Akash
              </Typography>
              <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                Admin
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};

export default Sidebar;
