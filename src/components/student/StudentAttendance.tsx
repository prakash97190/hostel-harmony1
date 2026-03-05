// Import React hook for managing state
import { useState } from 'react';

// Import types used for attendance records and mess bill data
import { AttendanceRecord, MessBill } from '@/lib/store';

// Import UI components used to build cards
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import UI components used to create a dropdown selector
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// List of months available in the attendance system
const months = ['January', 'February'];

// Keys used to fetch attendance data from the store
const monthKeys = ['2025-01', '2025-02'];

// Names of days used to build the calendar header
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Main component that displays student attendance and mess bill details
const StudentAttendance = ({ attendance, bills }: { attendance: Record<string, AttendanceRecord[]>; bills: MessBill[] }) => {

  // State to track which month is selected in the dropdown
  const [selectedMonth, setSelectedMonth] = useState('0');

  // Convert selected month string into an integer index
  const idx = parseInt(selectedMonth);

  // Get attendance records for the selected month
  const records = attendance[monthKeys[idx]] || [];

  // Find the mess bill corresponding to the selected month
  const bill = bills.find(b => b.month === idx + 1);

  // Calculate number of present days
  const presentCount = records.filter(r => r.status === 'present').length;

  // Calculate number of absent days
  const absentCount = records.filter(r => r.status === 'absent').length;

  // Calculate number of leave days
  const leaveCount = records.filter(r => r.status === 'leave').length;

  // Determine which day of the week the month starts on (for calendar alignment)
  const firstDay = new Date(2025, idx, 1).getDay();

  // Total days in the month (based on records)
  const daysInMonth = records.length;

  return (
    <div className="max-w-3xl">

      {/* Page Title */}
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Attendance</h1>

      {/* Month Selection Dropdown */}
      <div className="mb-6">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {/* Generate dropdown items for each month */}
            {months.map((m, i) => (
              <SelectItem key={i} value={String(i)}>
                {m} 2025
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Attendance Statistics Section */}
      <div className="grid grid-cols-3 gap-3 mb-6">

        {/* Present count card */}
        <StatCard label="Present" count={presentCount} className="bg-success/10 text-success" />

        {/* Absent count card */}
        <StatCard label="Absent" count={absentCount} className="bg-destructive/10 text-destructive" />

        {/* Leave count card */}
        <StatCard label="Leave" count={leaveCount} className="bg-leave/10 text-leave" />
      </div>

      {/* Calendar View Card */}
      <Card className="shadow-card mb-6">

        <CardHeader>
          {/* Title showing selected month */}
          <CardTitle className="text-lg">{months[idx]} 2025</CardTitle>
        </CardHeader>

        <CardContent>

          {/* Day names row (Sun–Sat) */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(d => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">

            {/* Empty cells before first day of month */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Render each day with attendance status color */}
            {records.map((r, i) => (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center rounded-md text-xs font-medium ${
                  r.status === 'present'
                    ? 'bg-success/15 text-success'
                    : r.status === 'absent'
                    ? 'bg-destructive/15 text-destructive'
                    : 'bg-leave/15 text-leave'
                }`}
              >
                {/* Day number */}
                {i + 1}
              </div>
            ))}
          </div>

          {/* Legend explaining color meaning */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-border">

            {/* Present legend */}
            <Legend color="bg-success" label="Present" />

            {/* Absent legend */}
            <Legend color="bg-destructive" label="Absent" />

            {/* Leave legend */}
            <Legend color="bg-leave" label="Leave" />
          </div>
        </CardContent>
      </Card>

      {/* Mess Bill Information Section */}
      {bill && (
        <Card className="shadow-card">
          <CardContent className="py-4">

            {/* Cost per day display */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cost per day</span>
              <span className="font-medium">₹{bill.costPerDay}</span>
            </div>

            {/* Total monthly bill display */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground">Monthly Bill</span>
              <span className="font-bold text-lg">₹{bill.totalAmount}</span>
            </div>

          </CardContent>
        </Card>
      )}
    </div>
  );
};



// Component used to show attendance statistics (Present / Absent / Leave)
const StatCard = ({ label, count, className }: { label: string; count: number; className: string }) => (
  <div className={`rounded-lg p-3 text-center ${className}`}>
    <p className="text-2xl font-bold">{count}</p>
    <p className="text-xs font-medium">{label}</p>
  </div>
);


// Component used to display color legend for attendance statuses
const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-1.5">
    <div className={`w-3 h-3 rounded-sm ${color}`} />
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);


// Export the component so it can be used in other parts of the project
export default StudentAttendance;