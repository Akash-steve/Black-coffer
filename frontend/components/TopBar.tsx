import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  Search,
  Notifications,
  ChatBubble,
  Settings,
  Logout,
  AccountCircle,
  MarkEmailRead,
  Email,
  Send,
} from '@mui/icons-material';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [messageAnchorEl, setMessageAnchorEl] = useState<null | HTMLElement>(null);

  // Sample notification data
  const notifications = [
    { id: 1, title: 'New data available', message: 'Energy sector data updated', time: '2 min ago', read: false },
    { id: 2, title: 'Filter alert', message: 'Region filter applied successfully', time: '15 min ago', read: false },
    { id: 3, title: 'System update', message: 'Dashboard performance improved', time: '1 hour ago', read: true },
    { id: 4, title: 'Data sync', message: 'All charts synchronized', time: '3 hours ago', read: true },
  ];

  // Sample message data
  const messages = [
    { id: 1, sender: 'Admin', message: 'Dashboard looks great!', time: '5 min ago', unread: true },
    { id: 2, sender: 'Team Lead', message: 'Please check the latest reports', time: '1 hour ago', unread: true },
    { id: 3, sender: 'System', message: 'Weekly report generated', time: '2 hours ago', unread: false },
  ];

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleMessageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMessageAnchorEl(event.currentTarget);
  };

  const handleMessageMenuClose = () => {
    setMessageAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#fff',
          color: '#2c2c3e',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          zIndex: theme => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <IconButton onClick={onMenuClick} sx={{ mr: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  background: 'linear-gradient(45deg, #7c3aed, #3b82f6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                V
              </Box>
            </IconButton>
            
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #7c3aed, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mr: 4,
              }}
            >
              VU<span style={{ WebkitTextFillColor: '#2c2c3e' }}>EXY</span>
            </Typography>

            <TextField
              size="small"
              placeholder="Search..."
              sx={{
                width: 300,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa',
                  '&:hover fieldset': {
                    borderColor: '#7c3aed',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7c3aed',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#9ca3af' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              sx={{ color: '#6c757d' }}
              onClick={handleNotificationMenuOpen}
            >
              <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            <IconButton 
              sx={{ color: '#6c757d' }}
              onClick={handleMessageMenuOpen}
            >
              <Badge badgeContent={messages.filter(m => m.unread).length} color="error">
                <ChatBubble />
              </Badge>
            </IconButton>

            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar sx={{ width: 32, height: 32, backgroundColor: '#7c3aed' }}>
                AK
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <AccountCircle sx={{ mr: 2 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Settings sx={{ mr: 2 }} />
                Settings
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Logout sx={{ mr: 2 }} />
                Logout
              </MenuItem>
            </Menu>

            {/* Notifications Dropdown */}
            <Menu
              anchorEl={notificationAnchorEl}
              open={Boolean(notificationAnchorEl)}
              onClose={handleNotificationMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: { width: 320, maxHeight: 400 }
              }}
            >
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  Notifications
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notifications.filter(n => !n.read).length} unread notifications
                </Typography>
              </Box>
              
              {notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  onClick={handleNotificationMenuClose}
                  sx={{
                    py: 1.5,
                    px: 2,
                    backgroundColor: notification.read ? 'transparent' : 'action.hover',
                    '&:hover': { backgroundColor: 'action.selected' }
                  }}
                >
                  <ListItemIcon>
                    <Notifications sx={{ color: notification.read ? 'text.secondary' : 'primary.main' }} />
                  </ListItemIcon>
                  <Box sx={{ flex: 1, mr: 1 }}>
                    <Typography variant="body2" fontWeight={notification.read ? 'normal' : 'bold'}>
                      {notification.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                  {!notification.read && (
                    <Chip size="small" color="primary" label="New" />
                  )}
                </MenuItem>
              ))}
              
              <Divider />
              <MenuItem onClick={handleNotificationMenuClose} sx={{ justifyContent: 'center' }}>
                <Typography variant="body2" color="primary">
                  Mark all as read
                </Typography>
              </MenuItem>
            </Menu>

            {/* Messages Dropdown */}
            <Menu
              anchorEl={messageAnchorEl}
              open={Boolean(messageAnchorEl)}
              onClose={handleMessageMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: { width: 320, maxHeight: 400 }
              }}
            >
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  Messages
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {messages.filter(m => m.unread).length} unread messages
                </Typography>
              </Box>
              
              {messages.map((message) => (
                <MenuItem
                  key={message.id}
                  onClick={handleMessageMenuClose}
                  sx={{
                    py: 1.5,
                    px: 2,
                    backgroundColor: message.unread ? 'action.hover' : 'transparent',
                    '&:hover': { backgroundColor: 'action.selected' }
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ width: 32, height: 32, mr: 1, fontSize: '0.875rem' }}>
                      {message.sender.charAt(0)}
                    </Avatar>
                  </ListItemIcon>
                  <Box sx={{ flex: 1, mr: 1 }}>
                    <Typography variant="body2" fontWeight={message.unread ? 'bold' : 'normal'}>
                      {message.sender}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {message.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {message.time}
                    </Typography>
                  </Box>
                  {message.unread && (
                    <Chip size="small" color="primary" label="New" />
                  )}
                </MenuItem>
              ))}
              
              <Divider />
              <MenuItem onClick={handleMessageMenuClose} sx={{ justifyContent: 'center' }}>
                <Typography variant="body2" color="primary">
                  View all messages
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
