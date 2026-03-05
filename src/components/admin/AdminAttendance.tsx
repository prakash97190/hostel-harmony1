// Import React hook for managing component state
import { useState } from 'react';

// Function to fetch all students from the store
import { getAllStudents } from '@/lib/store';

// Import UI components used in the interface
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Import toast notification library
import { toast } from 'sonner';

// Import icon
import { CalendarDays } from 'lucide-react';


// Main component for Admin Attendance Management
const AdminAttendance = () => {

  // Get list of all students
  const students = getAllStudents();

  // State to store selected date (default = today's date)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // State to store cost per day of mess (default ₹120)
  const [costPerDay, setCostPerDay] = useState('120');

  // State object to store attendance status for each student
  // Default status is set to "absent"
  const [statuses, setStatuses] = useState<Record<string, 'present' | 'absent' | 'leave'>>(
    Object.fromEntries(students.map(s => [s.id, 'absent']))
  );


  // Function to toggle student attendance status
  // Cycle: present → absent → leave → present
  const toggleStatus = (id: string) => {
    setStatuses(prev => ({
      ...prev,
      [id]: prev[id] === 'present' ? 'absent' : prev[id] === 'absent' ? 'leave' : 'present',
    }));
  };


  // Function to mark all students as present (except those on leave)
  const markAllPresent = () => {
    setStatuses(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(id => {
        if (next[id] !== 'leave') next[id] = 'present';
      });
      return next;
    });
  };


  // Function to mark all students as absent (except those on leave)
  const markAllAbsent = () => {
    setStatuses(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(id => {
        if (next[id] !== 'leave') next[id] = 'absent';
      });
      return next;
    });
  };


  // Function to save attendance
  const save = () => toast.success(`Attendance saved for ${date}`);

  // Function to generate monthly bills
  const generateBills = () => toast.success('Monthly bills generated for all students!');


  return (
    <div className="max-w-3xl">

      {/* Page Title */}
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">
        Attendance Management
      </h1>


      {/* Date Selection Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="space-y-1">

          <Label>Date</Label>

          {/* Date input field */}
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-44"
          />

        </div>
      </div>


      {/* Bulk Attendance Buttons */}
      <div className="flex gap-2 mb-4">

        {/* Mark all students present */}
        <Button variant="outline" size="sm" onClick={markAllPresent}>
          Mark All Present
        </Button>

        {/* Mark all students absent */}
        <Button variant="outline" size="sm" onClick={markAllAbsent}>
          Mark All Absent
        </Button>

      </div>


      {/* Students Attendance List */}
      <Card className="shadow-card mb-6">
        <CardContent className="py-2">

          {/* Loop through all students */}
          {students.map(s => (

            <div
              key={s.id}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >

              {/* Student Info */}
              <div className="flex items-center gap-3">

                {/* Avatar showing first letter of student name */}
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {s.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">
                    {s.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {s.rollNumber}
                  </p>
                </div>

              </div>


              {/* Attendance Status Button */}
              <button
                onClick={() => toggleStatus(s.id)}

                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  statuses[s.id] === 'present'
                    ? 'bg-success/15 text-success'
                    : statuses[s.id] === 'leave'
                    ? 'bg-leave/15 text-leave'
                    : 'bg-destructive/15 text-destructive'
                }`}
              >

                {/* Display status with first letter capitalized */}
                {statuses[s.id].charAt(0).toUpperCase() + statuses[s.id].slice(1)}

              </button>

            </div>

          ))}

        </CardContent>
      </Card>


      {/* Save Attendance Button */}
      <div className="flex gap-3">

        <Button
          onClick={save}
          className="gradient-primary text-primary-foreground"
        >
          Save Attendance
        </Button>

      </div>

    </div>
  );
};


// Export component for use in admin dashboard
export default AdminAttendance;