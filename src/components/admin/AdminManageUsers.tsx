// Import React hook for state management
import { useState } from 'react';

// Import user data and mock data (attendance and bills) from store
import { getAllUsers, User, mockAttendance, mockBills } from '@/lib/store';

// Import reusable UI components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// Import dropdown select components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Import badge component for showing user role
import { Badge } from '@/components/ui/badge';

// Import icons used in the UI
import { Search, Plus, ArrowLeft, UserPlus } from 'lucide-react';

// Import toast notification for success messages
import { toast } from 'sonner';

// Preset semester fee amount
const SEMESTER_PRESET = 36500;

// Type for switching between different UI views
type View = 'list' | 'add' | 'detail';

const AdminManageUsers = () => {

  // State for controlling which screen is visible
  const [view, setView] = useState<View>('list');

  // State for search input
  const [search, setSearch] = useState('');

  // State for storing selected user details
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Get all users from the store
  const users = getAllUsers();

  // Filter users based on search (name, roll number, or role)
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
    u.role.includes(search.toLowerCase())
  );

  // Handle new user creation
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    toast.success('User created successfully!'); // Show success message
    setView('list'); // Return to user list
  };

  // ===============================
  // USER DETAIL VIEW
  // ===============================
  if (view === 'detail' && selectedUser) {

    // Calculate total mess bill deductions
    const totalDeducted = mockBills.reduce((sum, b) => sum + b.totalAmount, 0);

    // Calculate remaining balance
    const balance = SEMESTER_PRESET - totalDeducted;

    // Flatten attendance object into a single array
    const allAttendance = Object.values(mockAttendance).flat();

    // Count attendance types
    const presentDays = allAttendance.filter(a => a.status === 'present').length;
    const absentDays = allAttendance.filter(a => a.status === 'absent').length;
    const leaveDays = allAttendance.filter(a => a.status === 'leave').length;

    return (
      <div className="max-w-2xl">

        {/* Back button to return to list */}
        <button
          onClick={() => { setView('list'); setSelectedUser(null); }}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to list
        </button>

        {/* User basic information card */}
        <Card className="shadow-card mb-4">
          <CardHeader>
            <div className="flex items-center gap-4">

              {/* User avatar with first letter */}
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
                {selectedUser.name.charAt(0)}
              </div>

              {/* User name and role */}
              <div>
                <CardTitle>{selectedUser.name}</CardTitle>
                <Badge variant="secondary" className="mt-1 capitalize">
                  {selectedUser.role}
                </Badge>
              </div>

            </div>
          </CardHeader>

          {/* User detail information */}
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Detail label="Roll Number / ID" value={selectedUser.rollNumber} />
            <Detail label="Phone" value={selectedUser.phone} />

            {/* Show only if data exists */}
            {selectedUser.hostelNumber && <Detail label="Hostel" value={selectedUser.hostelNumber} />}
            {selectedUser.semester && <Detail label="Semester" value={`Semester ${selectedUser.semester}`} />}
            {selectedUser.email && <Detail label="Email" value={selectedUser.email} />}
          </CardContent>
        </Card>

        {/* Financial and Attendance summary shown only for students */}
        {selectedUser.role === 'student' && (
          <>
            {/* Financial Summary */}
            <Card className="shadow-card mb-4">
              <CardHeader>
                <CardTitle className="text-base">Financial Summary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">

                  {/* Semester preset fee */}
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Semester Preset</p>
                    <p className="text-lg font-bold text-foreground">
                      ₹{SEMESTER_PRESET.toLocaleString()}
                    </p>
                  </div>

                  {/* Total deductions */}
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Total Deducted</p>
                    <p className="text-lg font-bold text-foreground">
                      ₹{totalDeducted.toLocaleString()}
                    </p>
                  </div>

                  {/* Remaining balance */}
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className={`text-lg font-bold ${balance >= 0 ? 'text-success' : 'text-destructive'}`}>
                      ₹{balance.toLocaleString()}
                    </p>
                  </div>

                </div>
              </CardContent>
            </Card>

            {/* Attendance Summary */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Attendance Summary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">

                  {/* Present days */}
                  <div className="p-3 rounded-lg bg-success/10">
                    <p className="text-xs text-muted-foreground">Present</p>
                    <p className="text-lg font-bold text-success">{presentDays}</p>
                  </div>

                  {/* Absent days */}
                  <div className="p-3 rounded-lg bg-destructive/10">
                    <p className="text-xs text-muted-foreground">Absent</p>
                    <p className="text-lg font-bold text-destructive">{absentDays}</p>
                  </div>

                  {/* Leave days */}
                  <div className="p-3 rounded-lg bg-leave/10">
                    <p className="text-xs text-muted-foreground">Leave</p>
                    <p className="text-lg font-bold text-leave">{leaveDays}</p>
                  </div>

                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    );
  }

  // ===============================
  // ADD USER VIEW
  // ===============================
  if (view === 'add') {
    return (
      <div className="max-w-lg">

        {/* Back button */}
        <button
          onClick={() => setView('list')}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to list
        </button>

        {/* Form card */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserPlus className="w-5 h-5" /> Add New User
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* User creation form */}
            <form onSubmit={handleAdd} className="space-y-4">

              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="Full name" required />
              </div>

              <div className="space-y-2">
                <Label>Roll Number / Username</Label>
                <Input placeholder="e.g. 2021CS006" required />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" placeholder="Set password" required />
              </div>

              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input placeholder="10-digit number" required />
              </div>

              {/* Role selection */}
              <div className="space-y-2">
                <Label>Role</Label>
                <Select defaultValue="student">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Optional student details */}
              <div className="space-y-2">
                <Label>Hostel Number (if student)</Label>
                <Input placeholder="e.g. H1" />
              </div>

              <div className="space-y-2">
                <Label>Semester (if student)</Label>
                <Input type="number" placeholder="e.g. 6" min={1} max={8} />
              </div>

              {/* Submit button */}
              <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                Create User
              </Button>

            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ===============================
  // USER LIST VIEW
  // ===============================
  return (
    <div className="max-w-3xl">

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Manage Users
        </h1>

        {/* Add user button */}
        <Button
          onClick={() => setView('add')}
          className="gradient-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Search by roll number, name, or role..."
          className="pl-10"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* User list */}
      <div className="space-y-2">
        {filtered.map(u => (

          <Card
            key={u.id}
            className="shadow-card cursor-pointer hover:shadow-card-hover transition-shadow"
            onClick={() => { setSelectedUser(u); setView('detail'); }}
          >

            <CardContent className="py-3 flex items-center justify-between">

              {/* User basic info */}
              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {u.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.rollNumber}</p>
                </div>

              </div>

              {/* Role badge */}
              <Badge variant="secondary" className="capitalize">
                {u.role}
              </Badge>

            </CardContent>
          </Card>

        ))}

        {/* No users found message */}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

// Reusable component for displaying user details
const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="p-3 rounded-lg bg-muted/50">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-medium text-foreground">{value}</p>
  </div>
);

export default AdminManageUsers;