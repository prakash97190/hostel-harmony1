import { useState } from 'react'; // React hook to manage component state
import { useAuth } from '@/lib/store'; // Custom authentication hook to access user data
import { Navigate } from 'react-router-dom'; // Used for redirecting users
import DashboardLayout from '@/components/DashboardLayout'; // Layout component for dashboard UI
import AdminProfile from '@/components/admin/AdminProfile'; // Admin profile component
import AdminManageUsers from '@/components/admin/AdminManageUsers'; // Component to manage users
import AdminAttendance from '@/components/admin/AdminAttendance'; // Attendance management component
import AdminLeave from '@/components/admin/AdminLeave'; // Leave management component
import AdminMessBills from '@/components/admin/AdminMessBills'; // Mess bills management component
import AdminNotifications from '@/components/admin/AdminNotifications'; // Notifications management component
import { User, Users, CalendarDays, TreePalm, Receipt, Bell } from 'lucide-react'; // Icons for tabs

// List of dashboard tabs with id, label and icon
const tabs = [
  { id: 'profile', label: 'Profile', icon: User }, // Admin profile tab
  { id: 'users', label: 'Manage Users', icon: Users }, // User management tab
  { id: 'attendance', label: 'Attendance', icon: CalendarDays }, // Attendance tab
  { id: 'leave', label: 'Leave', icon: TreePalm }, // Leave management tab
  { id: 'bills', label: 'Mess Bills', icon: Receipt }, // Mess bill management tab
  { id: 'notifications', label: 'Notifications', icon: Bell }, // Notifications tab
];

// Main Admin Dashboard component
const AdminDashboard = () => {

  // Get currently logged in user from auth store
  const user = useAuth(s => s.user);

  // State to track which tab is currently active
  const [activeTab, setActiveTab] = useState('profile');

  // If user is not logged in or not an admin, redirect to home page
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />;

  return (

    // Dashboard layout wrapper which contains sidebar and main content
    <DashboardLayout
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >

      {/* Animation wrapper for smooth tab transitions */}
      <div className="animate-fade-in">

        {/* Render components based on selected tab */}

        {activeTab === 'profile' && <AdminProfile user={user} />}

        {activeTab === 'users' && <AdminManageUsers />}

        {activeTab === 'attendance' && <AdminAttendance />}

        {activeTab === 'leave' && <AdminLeave />}

        {activeTab === 'bills' && <AdminMessBills />}

        {activeTab === 'notifications' && <AdminNotifications />}

      </div>

    </DashboardLayout>
  );
};

// Export the dashboard component
export default AdminDashboard;