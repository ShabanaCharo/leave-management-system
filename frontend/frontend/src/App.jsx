import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/authContext';
import theme from './styles/theme';
import ManagerDashboard from './components/manager/Dashboard'; 

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './components/auth/Register';
import NotFoundPage from './pages/NotFoundPage';

// Layout Pages
import EmployeePage from './pages/EmployeePage';
import ManagerPage from './pages/ManagerPage';

// Employee Sub-Pages
import Dashboard from './components/employee/Dashboard';
import ApplyLeave from './components/employee/ApplyLeave';
import LeaveHistory from './components/employee/LeaveHistory';
import Profile from './components/employee/Profile';

// Manager Sub-Pages
import CreateManager from './components/manager/CreateManager';
import TeamLeaves from './components/manager/TeamLeaves';
import ManagerProfile from './components/manager/Profile';
import LeaveApproval from './components/manager/LeaveApproval';

import ProtectedRoute from './components/common/ProtectedRoute';

const AppRoutes = () => {
  const { isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Employee Routes */}
      <Route path="/employee" element={<ProtectedRoute allowedRoles={['employee']} />}>
        <Route element={<EmployeePage />}>
          <Route index element={<Dashboard />} />
          <Route path="apply" element={<ApplyLeave />} />
          <Route path="history" element={<LeaveHistory />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Protected Manager Routes */}
      <Route path="/manager" element={<ProtectedRoute allowedRoles={['manager']} />}>
        <Route element={<ManagerPage />}>
          <Route index element={<ManagerDashboard />} />
          <Route path="create" element={<CreateManager />} />
          <Route path="profile" element={<ManagerProfile />} />
          <Route path="team" element={<TeamLeaves />} />
          <Route path="approvals" element={<LeaveApproval />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
