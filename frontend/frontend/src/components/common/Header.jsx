import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Leave Management System
        </Typography>
        {user && (
          <>
            <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
            <Button color="inherit" onClick={() => logout()}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;