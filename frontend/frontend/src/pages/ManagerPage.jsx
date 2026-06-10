import { Box } from '@mui/material';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { Outlet } from 'react-router-dom';

const ManagerPage = () => {
  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar
        drawerWidth={drawerWidth}
        items={[
          { text: 'Dashboard', path: '/manager' },
          { text: 'Leave Approvals', path: '/manager/approvals' },
          { text: 'Team Leaves', path: '/manager/team' },
          { text: 'Profile', path: '/manager/profile' },
        ]}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default ManagerPage;