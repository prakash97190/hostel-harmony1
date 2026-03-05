// Import card UI components used for layout
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import icon used to show each rule item
import { CheckCircle } from 'lucide-react';


// Array containing all mess rules and regulations
const rules = [
  'Mess timings must be strictly followed. Breakfast: 7:30–9:00 AM, Lunch: 12:00–2:00 PM, Dinner: 7:00–9:00 PM.',
  'Students must carry their mess ID card during meals.',
  'Wasting food is strictly prohibited. Fines will be imposed for repeated offences.',
  'Students on leave must apply at least 24 hours in advance through the admin.',
  'Mess bills must be cleared before the 10th of each month.',
  'Any complaints regarding food quality should be reported to the mess committee.',
  'Outside food is not allowed inside the mess hall.',
  'Maintaining hygiene and cleanliness in the mess area is everyone\'s responsibility.',
];


// Component to display the mess rules and regulations
const StudentRules = () => (
  <div className="max-w-2xl">

    {/* Page heading */}
    <h1 className="text-2xl font-heading font-bold text-foreground mb-6">
      Rules & Regulations
    </h1>

    {/* Card container for rules list */}
    <Card className="shadow-card">

      {/* Card header title */}
      <CardHeader>
        <CardTitle className="text-lg">
          Mess Rules
        </CardTitle>
      </CardHeader>

      <CardContent>

        {/* Unordered list of rules */}
        <ul className="space-y-3">

          {/* Loop through rules array and display each rule */}
          {rules.map((rule, i) => (

            <li key={i} className="flex gap-3 items-start">

              {/* Check icon for visual indication of rule */}
              <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />

              {/* Rule text */}
              <span className="text-sm text-foreground">
                {rule}
              </span>

            </li>

          ))}

        </ul>
      </CardContent>
    </Card>
  </div>
);


// Export component to use in other parts of the application
export default StudentRules;