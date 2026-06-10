import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  DateRange as DateRangeIcon,
  Group as GroupIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const iconMap = {
  'Dashboard': <DashboardIcon />,
  'Apply Leave': <DateRangeIcon />,
  'Leave History': <DateRangeIcon />,
  'Team Leaves': <GroupIcon />,
  'Profile': <PersonIcon />,
};

const Sidebar = ({ items }) => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f9f9f9',
          borderRight: '1px solid #ddd',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={600} sx={{ mx: 'auto' }}>
          Navigation
        </Typography>
      </Toolbar>
      <Box sx={{ px: 1 }}>
        <List>
          {items.map((item) => {
            const selected = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                selected={selected}
                sx={{
                  borderRadius: 2,
                  my: 0.5,
                  color: selected ? 'primary.main' : 'text.primary',
                  backgroundColor: selected ? 'primary.light' : 'transparent',
                  '&:hover': {
                    backgroundColor: selected ? 'primary.light' : '#e0e0e0',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {iconMap[item.text]}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
