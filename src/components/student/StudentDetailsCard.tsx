// Import React hook for managing component state
import { useState } from 'react';

// Import User type from the project store
import { User } from '@/lib/store';

// Import UI card components used for layout
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import UI elements
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Import icons used in the UI
import { Phone, Hash, Building, BookOpen, Lock ,LucideIcon} from 'lucide-react';

// Import toast notifications for success/error messages
import { toast } from 'sonner';


// Main component that displays student information and allows password change
const StudentDetailsCard = ({ user }: { user: User }) => {

  // State to toggle password change form visibility
  const [showChangePassword, setShowChangePassword] = useState(false);

  // States to store password input values
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to validate and update the password
  const handleChangePassword = () => {

    // Check if any field is empty
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    // Ensure password has minimum length
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Show success message
    toast.success('Password changed successfully!');

    // Reset form and hide password section
    setShowChangePassword(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-2xl">

      {/* Page title */}
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">
        My Details
      </h1>

      {/* Card displaying student information */}
      <Card className="shadow-card">

        {/* Card header with profile icon and student name */}
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">

            {/* Avatar circle showing first letter of student's name */}
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center text-2xl font-bold text-accent-foreground">
              {user.name.charAt(0)}
            </div>

            {/* Student name and roll number */}
            <div>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                {user.rollNumber}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>

          {/* Grid layout for student information */}
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Student mobile number */}
            <InfoRow icon={Phone} label="Mobile" value={user.phone} />

            {/* Student roll number */}
            <InfoRow icon={Hash} label="Roll No" value={user.rollNumber} />

            {/* Hostel number */}
            <InfoRow icon={Building} label="Hostel" value={user.hostelNumber || '—'} />

            {/* Semester information */}
            <InfoRow
              icon={BookOpen}
              label="Semester"
              value={user.semester ? `Semester ${user.semester}` : '—'}
            />
          </div>


          {/* Change Password Section */}
          <div className="mt-6">

            {/* Button to toggle password change form */}
            <Button
              variant="outline"
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="gap-2"
            >
              <Lock className="w-4 h-4" /> Change Password
            </Button>


            {/* Password form appears when button is clicked */}
            {showChangePassword && (
              <div className="mt-4 space-y-3 p-4 rounded-lg border border-border bg-muted/30">

                {/* Old password input */}
                <div className="space-y-1">
                  <Label>Old Password</Label>
                  <Input
                    type="password"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    placeholder="Enter old password"
                  />
                </div>

                {/* New password input */}
                <div className="space-y-1">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm new password input */}
                <div className="space-y-1">
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>

                {/* Buttons for updating or cancelling password change */}
                <div className="flex gap-2 pt-2">

                  {/* Update password button */}
                  <Button
                    onClick={handleChangePassword}
                    className="gradient-primary text-primary-foreground"
                  >
                    Update Password
                  </Button>

                  {/* Cancel password change */}
                  <Button
                    variant="ghost"
                    onClick={() => setShowChangePassword(false)}
                  >
                    Cancel
                  </Button>

                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};



// Reusable component to display student information rows
const InfoRow = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">

    {/* Icon representing the information type */}
    <Icon className="w-4 h-4 text-muted-foreground" />

    {/* Label and value */}
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);
// Export the component so it can be used in other parts of the application
 export default StudentDetailsCard;