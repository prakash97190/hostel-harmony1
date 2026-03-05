// Import React hook for managing component state
import { useState } from 'react';

// Import MessBill type from the store
import { MessBill } from '@/lib/store';

// Import UI components used to build the interface
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// Import icons used in the UI
import { Printer, IndianRupee } from 'lucide-react';

// Array containing all months of the year
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Fixed semester mess fee preset for the student
const SEMESTER_PRESET = 36500;


// Main component to display mess bill information
const StudentMessBill = ({ bills }: { bills: MessBill[] }) => {

  // State to track which month is selected
  const [selectedMonth, setSelectedMonth] = useState('1');

  // Find the bill corresponding to the selected month
  const bill = bills.find(b => b.month === parseInt(selectedMonth));

  // Calculate total amount deducted so far from semester preset
  const totalDeducted = bills.reduce((sum, b) => sum + b.totalAmount, 0);

  // Calculate remaining balance in semester preset
  const semesterBalance = SEMESTER_PRESET - totalDeducted;

  // Function to print the bill
  const handlePrint = () => window.print();

  return (
    <div className="max-w-2xl">

      {/* Page title */}
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">
        Mess Bill
      </h1>


      {/* Semester Overview Section */}
      <Card className="shadow-card mb-6">
        <CardContent className="py-4">

          {/* Grid displaying preset amount, deducted amount, and balance */}
          <div className="grid grid-cols-3 gap-4 text-center">

            {/* Semester preset amount */}
            <div>
              <p className="text-xs text-muted-foreground">Semester Preset</p>
              <p className="text-lg font-bold text-foreground">
                ₹{SEMESTER_PRESET.toLocaleString()}
              </p>
            </div>

            {/* Total amount deducted so far */}
            <div>
              <p className="text-xs text-muted-foreground">Total Deducted</p>
              <p className="text-lg font-bold text-foreground">
                ₹{totalDeducted.toLocaleString()}
              </p>
            </div>

            {/* Remaining balance */}
            <div>
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className={`text-lg font-bold ${semesterBalance >= 0 ? 'text-success' : 'text-destructive'}`}>
                ₹{semesterBalance.toLocaleString()}
              </p>
            </div>

          </div>
        </CardContent>
      </Card>


      {/* Month selection dropdown */}
      <div className="mb-6">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>

          {/* Dropdown trigger */}
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>

          {/* Dropdown month options */}
          <SelectContent>
            {months.map((m, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                {m} 2025
              </SelectItem>
            ))}
          </SelectContent>

        </Select>
      </div>


      {/* If bill exists for selected month */}
      {bill ? (

        <Card className="shadow-card">

          {/* Bill header showing month and print button */}
          <CardHeader className="flex-row items-center justify-between">

            {/* Month and year */}
            <CardTitle className="text-lg">
              {months[bill.month - 1]} {bill.year}
            </CardTitle>

            {/* Print bill button */}
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>

          </CardHeader>

          <CardContent>

            {/* Bill details */}
            <div className="space-y-3">

              {/* Total present days */}
              <BillRow
                label="Total Present Days"
                value={`${bill.totalDaysPresent} days`}
              />

              {/* Cost per day */}
              <BillRow
                label="Cost Per Day"
                value={`₹${bill.costPerDay}`}
              />

              {/* Divider */}
              <div className="border-t border-border my-2" />

              {/* Monthly deduction */}
              <BillRow
                label="Monthly Deduction"
                value={`₹${bill.totalAmount}`}
                bold
              />

            </div>

          </CardContent>
        </Card>

      ) : (

        // If bill is not available
        <Card className="shadow-card">
          <CardContent className="py-12 text-center">

            {/* Icon indicating no bill */}
            <IndianRupee className="w-10 h-10 text-muted-foreground mx-auto mb-3" />

            {/* Message */}
            <p className="text-muted-foreground">
              No bill generated for this month yet.
            </p>

          </CardContent>
        </Card>

      )}
    </div>
  );
};


// Reusable component to display a row in the bill
const BillRow = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex items-center justify-between">

    {/* Label of the bill item */}
    <span className="text-sm text-muted-foreground">{label}</span>

    {/* Value of the bill item */}
    <span className={`text-sm ${bold ? 'font-bold text-foreground' : 'font-medium text-foreground'}`}>
      {value}
    </span>

  </div>
);


// Export component so it can be used in other parts of the application
export default StudentMessBill;