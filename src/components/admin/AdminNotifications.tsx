// Import React hook for managing component state
import { useState } from 'react';

// Import reusable UI components used for layout and styling
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Import toast notification library for success/error alerts
import { toast } from 'sonner';

// Import icon used in the UI
import { Send } from 'lucide-react';

const AdminNotifications = () => {

  // State to store the notification message entered by the admin
  const [message, setMessage] = useState('');

  // Function to send notification to all students
  const handleSend = () => {

    // Check if message field is empty
    if (!message.trim()) {
      toast.error('Please write a message'); // Show error message
      return;
    }

    // Show success message when notification is sent
    toast.success('Notification sent to all students!');

    // Clear message field after sending notification
    setMessage('');
  };

  return (
    <div className="max-w-lg">

      {/* Page heading */}
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">
        Notifications
      </h1>

      {/* Notification card container */}
      <Card className="shadow-card">

        {/* Card header with title and icon */}
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Send className="w-5 h-5" />
            Send Notification
          </CardTitle>
        </CardHeader>

        {/* Card body containing input and button */}
        <CardContent className="space-y-4">

          {/* Message input section */}
          <div className="space-y-2">
            <Label>Message</Label>

            {/* Textarea for admin to write notification */}
            <Textarea
              placeholder="Write your notification message here..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
            />
          </div>

          {/* Button to send notification to all students */}
          <Button
            onClick={handleSend}
            className="w-full gradient-primary text-primary-foreground"
          >
            <Send className="w-4 h-4 mr-2" />
            Send to All Students
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotifications;