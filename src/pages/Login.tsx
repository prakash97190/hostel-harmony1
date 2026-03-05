import { useState } from 'react'; // React hook for managing component state
import { useNavigate } from 'react-router-dom'; // Hook used for programmatic navigation between routes
import { useAuth, UserRole } from '@/lib/store'; // Custom authentication hook and user role type
import { Button } from '@/components/ui/button'; // Reusable button component
import { Input } from '@/components/ui/input'; // Reusable input field component
import { Label } from '@/components/ui/label'; // Label component for form inputs
import { Card, CardContent, CardHeader } from '@/components/ui/card'; // Card UI components for layout

// Login component for both Student and Admin
const Login = () => {

  // State to store roll number or admin ID
  const [rollNumber, setRollNumber] = useState('');

  // State to store password input
  const [password, setPassword] = useState('');

  // State to track selected role (student or admin)
  const [role, setRole] = useState<UserRole>('student');

  // State to store error message if login fails
  const [error, setError] = useState('');

  // Login function from auth store
  const login = useAuth(s => s.login);

  // Navigation hook for redirecting after login
  const navigate = useNavigate();

  // Function that runs when login form is submitted
  const handleSubmit = (e: React.FormEvent) => {

    // Prevent page refresh on form submit
    e.preventDefault();

    // Clear previous errors
    setError('');

    // Check if required fields are empty
    if (!rollNumber || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Call login function from auth store
    const success = login(rollNumber, password, role);

    // If login successful redirect based on role
    if (success) {
      navigate(role === 'admin' ? '/admin' : '/student');
    } else {

      // Show error if login fails
      setError('Invalid credentials or role mismatch');
    }
  };

  return (

    // Main container centered vertically and horizontally
    <div className="min-h-screen flex items-center justify-center bg-background p-4">

      {/* Login card wrapper */}
      <div className="w-full max-w-md animate-fade-in">
        
        {/* Logo Section */}
        <div className="text-center mb-8">

          {/* Logo container */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-4">
            <img
              src="/nitkkr.png" // NIT Kurukshetra logo
              alt="NIT KKR Logo"
              className="w-21 h-21 object-contain rounded-2xl"
            />
          </div>

          {/* System title */}
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Mess Management System
          </h1>
        </div>

        {/* Login Card */}
        <Card className="shadow-card">

          <CardHeader className="pb-4">
            
            {/* Role Selector (Student/Admin) */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg">

              {/* Student role button */}
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                  role === 'student'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Student
              </button>

              {/* Admin role button */}
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all ${
                  role === 'admin'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Admin
              </button>

            </div>
          </CardHeader>

          <CardContent>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Roll Number or Admin ID input */}
              <div className="space-y-2">

                {/* Dynamic label based on role */}
                <Label htmlFor="rollNumber">
                  {role === 'admin' ? 'Admin ID' : 'Roll Number'}
                </Label>

                <Input
                  id="rollNumber"
                  placeholder={role === 'admin' ? 'e.g. ADMIN001' : 'e.g. 2021CS001'}
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>

              {/* Password input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Error message display */}
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full gradient-primary text-primary-foreground"
              >
                Sign In
              </Button>

              {/* Demo login credentials info */}
              <p className="text-xs text-center text-muted-foreground mt-4">
                Demo: Use <span className="font-medium text-foreground">2021CS001</span> (student) or{' '}
                <span className="font-medium text-foreground">ADMIN001</span> (admin) with any password
              </p>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Export the login component
export default Login;