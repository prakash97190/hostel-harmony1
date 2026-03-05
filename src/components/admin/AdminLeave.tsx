// Import React hook for managing state
import { useState } from 'react';

// Function to get all students from the data store
import { getAllStudents } from '@/lib/store';

// Import UI components used in the interface
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Import toast notification library
import { toast } from 'sonner';

// Import icon used in the UI
import { TreePalm } from 'lucide-react';


// Main component for Admin Leave Management
const AdminLeave = () => {

  // Get list of all students
  const students = getAllStudents();

  // State for storing roll number input
  const [rollNumber, setRollNumber] = useState('');

  // State for leave start date
  const [fromDate, setFromDate] = useState('');

  // State for leave end date
  const [toDate, setToDate] = useState('');

  // State to control suggestions dropdown visibility
  const [showSuggestions, setShowSuggestions] = useState(false);


  // Filter students based on roll number or name typed in input
  const filteredStudents = rollNumber.trim()
    ? students.filter(s =>
        s.rollNumber.toLowerCase().includes(rollNumber.toLowerCase()) ||
        s.name.toLowerCase().includes(rollNumber.toLowerCase())
      )
    : [];


  // Find the student that exactly matches the entered roll number
  const selectedStudent = students.find(
    s => s.rollNumber.toLowerCase() === rollNumber.toLowerCase()
  );


  // Function to select a student from suggestions list
  const handleSelectStudent = (roll: string) => {
    setRollNumber(roll);
    setShowSuggestions(false);
  };


  // Function to save leave request
  const handleSave = () => {

    // Validate required fields
    if (!selectedStudent || !fromDate || !toDate) {
      toast.error('Please select a valid student and fill all fields');
      return;
    }

    // Success message after assigning leave
    toast.success(`Leave assigned to ${selectedStudent.name} successfully!`);

    // Reset form fields
    setRollNumber('');
    setFromDate('');
    setToDate('');
  };


  return (
    <div className="max-w-2xl space-y-6">

      {/* Page Title */}
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Leave Management
      </h1>


      {/* Card for assigning leave */}
      <Card className="shadow-card">

        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">

            {/* Icon with title */}
            <TreePalm className="w-5 h-5" /> Assign Leave

          </CardTitle>
        </CardHeader>


        <CardContent className="space-y-4">

          {/* Student Search Input */}
          <div className="space-y-2 relative">

            <Label>Student Roll Number</Label>

            {/* Input field to search student */}
            <Input
              placeholder="Search by roll number or name..."
              value={rollNumber}
              onChange={e => {
                setRollNumber(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />


            {/* Suggestions dropdown list */}
            {showSuggestions && rollNumber.trim() && filteredStudents.length > 0 && !selectedStudent && (

              <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">

                {/* Display matching students */}
                {filteredStudents.map(s => (

                  <button
                    key={s.id}
                    type="button"
                    className="w-full text-left px-3 py-2 hover:bg-accent flex items-center gap-3 transition-colors"
                    onClick={() => handleSelectStudent(s.rollNumber)}
                  >

                    {/* Student avatar */}
                    <div className="w-7 h-7 rounded-md gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {s.name.charAt(0)}
                    </div>

                    {/* Student details */}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {s.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {s.rollNumber}
                      </p>
                    </div>

                  </button>

                ))}

              </div>
            )}


            {/* Show selected student confirmation */}
            {rollNumber && selectedStudent && (
              <p className="text-xs text-success">
                Selected: {selectedStudent.name}
              </p>
            )}


            {/* Show error if no student found */}
            {rollNumber && !selectedStudent && filteredStudents.length === 0 && (
              <p className="text-xs text-destructive">
                No student found
              </p>
            )}

          </div>


          {/* Leave start date */}
          <div className="space-y-2">

            <Label>From Date</Label>

            <Input
              type="date"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
            />

          </div>


          {/* Leave end date */}
          <div className="space-y-2">

            <Label>To Date</Label>

            <Input
              type="date"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
            />

          </div>


          {/* Save leave button */}
          <Button
            onClick={handleSave}
            className="w-full gradient-primary text-primary-foreground"
          >
            Save Leave
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};


// Export component for admin dashboard usage
export default AdminLeave;