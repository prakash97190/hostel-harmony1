import { useState } from 'react'; // React hook for managing component state
import { useAuth, mockAttendance, mockBills, mockNotifications } from '@/lib/store'; // Custom auth hook and mock data from store
import { Navigate } from 'react-router-dom'; // Used for redirecting users if not authorized
import DashboardLayout from '@/components/DashboardLayout'; // Layout component used for dashboard structure
import StudentDetailsCard from '@/components/student/StudentDetailsCard'; // Component to display student personal details
import StudentMessBill from '@/components/student/StudentMessBill'; // Component to display student's mess bill
import StudentAttendance from '@/components/student/StudentAttendance'; // Component to show attendance details
import StudentRules from '@/components/student/StudentRules'; // Component displaying mess/hostel rules
import StudentNotifications from '@/components/student/StudentNotifications'; // Component for viewing notifications
import { User, Receipt, CalendarDays, BookOpen, Bell } from 'lucide-react'; // Icons used for dashboard tabs

// List of dashboard tabs with id, label, and icon
const tabs = [
  { id: 'details', label: 'My Details', icon: User },
  { id: 'bill', label: 'Mess Bill', icon: Receipt },
  { id: 'attendance', label: 'Attendance', icon: CalendarDays },
  { id: 'rules', label: 'Rules', icon: BookOpen },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

// Main Student Dashboard component
const StudentDashboard = () => {

  // Get logged-in user information from auth store
  const user = useAuth(s => s.user);

  // State to track which tab is currently active
  const [activeTab, setActiveTab] = useState('details');

  // Redirect to login page if user is not logged in or not a student
  if (!user || user.role !== 'student') return <Navigate to="/" replace />;

  return (

    // Dashboard layout with tabs and tab change handler
    <DashboardLayout tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>

      {/* Animation wrapper for smooth UI transition */}
      <div className="animate-fade-in">

        {/* Show student details tab */}
        {activeTab === 'details' && <StudentDetailsCard user={user} />}

        {/* Show mess bill tab */}
        {activeTab === 'bill' && <StudentMessBill bills={mockBills} />}

        {/* Show attendance tab */}
        {activeTab === 'attendance' && <StudentAttendance attendance={mockAttendance} bills={mockBills} />}

        {/* Show rules tab */}
        {activeTab === 'rules' && <StudentRules />}

        {/* Show notifications tab */}
        {activeTab === 'notifications' && <StudentNotifications notifications={mockNotifications} />}

      </div>

    </DashboardLayout>
  );
};

// Export the StudentDashboard component
export default StudentDashboard;