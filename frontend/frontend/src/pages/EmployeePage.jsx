import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAuth } from '../context/authContext';

const EmployeePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { text: 'Dashboard', path: '/employee' },
    { text: 'Apply Leave', path: '/employee/apply' },
    { text: 'Leave History', path: '/employee/history' },
    { text: 'Profile', path: '/employee/profile' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar items={sidebarItems} />

      {/* Main Section */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={600}>
              Employee Panel
            </Typography>

            {user && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar alt={user.name || 'User'}>
                  {(user.name || user.email)?.[0]?.toUpperCase()}
                </Avatar>
                {!isMobile && (
                  <Typography variant="body1">
                    {user.name || user.email}
                  </Typography>
                )}
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    borderColor: '#fff',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeePage;
