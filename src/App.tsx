// Import toast notification component
import { Toaster } from "@/components/ui/toaster";

// Import Sonner toast notification and rename it to avoid name conflict
import { Toaster as Sonner } from "@/components/ui/sonner";

// Provider for enabling tooltips across the application
import { TooltipProvider } from "@/components/ui/tooltip";

// React Query components for managing server state and API caching
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Router components for navigation and routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import application pages
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Create a QueryClient instance used by React Query for caching and fetching data
const queryClient = new QueryClient();

// Main App component
const App = () => (
  // Provide React Query client to the entire application
  <QueryClientProvider client={queryClient}>

    {/* Enables tooltip functionality globally */}
    <TooltipProvider>

      {/* Default toast notification container */}
      <Toaster />

      {/* Sonner toast notification positioned at the top center */}
      <Sonner position="top-center"/>

      {/* Router for handling page navigation */}
      <BrowserRouter>

        {/* Define application routes */}
        <Routes>

          {/* Login page route */}
          <Route path="/" element={<Login />} />

          {/* Student dashboard route */}
          <Route path="/student" element={<StudentDashboard />} />

          {/* Admin dashboard route */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Catch-all route for undefined paths (404 page) */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

// Export the App component as default so it can be rendered in index.tsx/main.tsx
export default App;