// Import Notification type from the store
import { Notification } from '@/lib/store';

// Import UI components used to display notification cards
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import bell icon used when there are no notifications
import { Bell } from 'lucide-react';

// Import date formatting function
import { format } from 'date-fns';


// Component to display student notifications
const StudentNotifications = ({ notifications }: { notifications: Notification[] }) => (

  <div className="max-w-2xl">

    {/* Page title */}
    <h1 className="text-2xl font-heading font-bold text-foreground mb-6">
      Notifications
    </h1>

    {/* If there are no notifications */}
    {notifications.length === 0 ? (

      <Card className="shadow-card">
        <CardContent className="py-12 text-center">

          {/* Icon indicating empty notification list */}
          <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-3" />

          {/* Message shown when no notifications exist */}
          <p className="text-muted-foreground">
            No notifications yet.
          </p>

        </CardContent>
      </Card>

    ) : (

      // If notifications exist, display them in a list
      <div className="space-y-3">

        {notifications.map(n => (

          // Each notification displayed inside a card
          <Card key={n.id} className="shadow-card">
            <CardContent className="py-4">

              {/* Notification message */}
              <p className="text-sm text-foreground">
                {n.message}
              </p>

              {/* Formatted notification date and time */}
              <p className="text-xs text-muted-foreground mt-2">
                {format(new Date(n.createdAt), 'dd MMM yyyy, hh:mm a')}
              </p>

            </CardContent>
          </Card>

        ))}

      </div>

    )}
  </div>
);


// Export component for use in other parts of the application
export default StudentNotifications;