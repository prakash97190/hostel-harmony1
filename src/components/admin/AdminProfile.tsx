import { useState } from 'react'; // React hook to manage component state
import { ComponentType } from 'react'; // React component type
import { User } from '@/lib/store'; // User type from store
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // UI card components
import { Button } from '@/components/ui/button'; // Button component
import { Input } from '@/components/ui/input'; // Input field component
import { Label } from '@/components/ui/label'; // Label component
import { Phone, Mail, Hash, ShieldCheck, Lock } from 'lucide-react'; // Icons used in UI
import { toast } from 'sonner'; // Toast notifications for success/error messages

// Main Admin Profile Component
// Receives user object as a prop
const AdminProfile = ({ user }: { user: User }) => {

  // State to toggle password change section visibility
  const [showChangePassword, setShowChangePassword] = useState(false);

  // State variables to store password inputs
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to handle password change logic
  const handleChangePassword = () => {

    // Check if any password field is empty
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    // Check if password length is valid
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // If validation passes, show success message
    toast.success('Password changed successfully!');

    // Reset password form
    setShowChangePassword(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    // Container for admin profile
    <div className="max-w-2xl">

      {/* Page title */}
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">
        Admin Profile
      </h1>

      {/* Profile card */}
      <Card className="shadow-card">

        {/* Card Header */}
        <CardHeader className="pb-4">

          {/* Admin avatar and details */}
          <div className="flex items-center gap-4">

            {/* Avatar circle with first letter of admin name */}
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center text-2xl font-bold text-accent-foreground">
              {user.name.charAt(0)}
            </div>

            {/* Admin name and role */}
            <div>
              <CardTitle className="text-xl">{user.name}</CardTitle>

              {/* Admin role label */}
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Administrator
              </p>
            </div>

          </div>
        </CardHeader>

        {/* Card Body */}
        <CardContent>

          {/* Admin information grid */}
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Employee ID */}
            <InfoRow icon={Hash} label="Employee ID" value={user.rollNumber} />

            {/* Phone number */}
            <InfoRow icon={Phone} label="Mobile" value={user.phone} />

            {/* Email */}
            <InfoRow icon={Mail} label="Email" value={user.email || '—'} />

          </div>

          {/* Change password section */}
          <div className="mt-6">

            {/* Button to toggle password form */}
            <Button
              variant="outline"
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="gap-2"
            >
              <Lock className="w-4 h-4" /> Change Password
            </Button>

            {/* Password form appears when showChangePassword is true */}
            {showChangePassword && (

              <div className="mt-4 space-y-3 p-4 rounded-lg border border-border bg-muted/30">

                {/* Old Password Input */}
                <div className="space-y-1">
                  <Label>Old Password</Label>
                  <Input
                    type="password"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    placeholder="Enter old password"
                  />
                </div>

                {/* New Password Input */}
                <div className="space-y-1">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-1">
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>

                {/* Buttons for updating or canceling password change */}
                <div className="flex gap-2 pt-2">

                  {/* Update password button */}
                  <Button
                    onClick={handleChangePassword}
                    className="gradient-primary text-primary-foreground"
                  >
                    Update Password
                  </Button>

                  {/* Cancel button */}
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

// Reusable component to display profile information rows
const InfoRow = ({
  icon: Icon,
  label,
  value
}: {
  icon: ComponentType<{ className: string }>;
  label: string;
  value: string;
}) => (

  // Row container
  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">

    {/* Icon */}
    <Icon className="w-4 h-4 text-muted-foreground" />

    {/* Label and value */}
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>

  </div>
);

// Export component
export default AdminProfile;