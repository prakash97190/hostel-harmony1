import { useLocation } from "react-router-dom"; // Hook to access the current route location
import { useEffect } from "react"; // React hook used to perform side effects

// Component to display a 404 page when the user visits a route that does not exist
const NotFound = () => {

  // Get the current URL location
  const location = useLocation();

  // Log an error message in the console whenever an invalid route is accessed
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]); // Runs whenever the route path changes

  return (
    // Full-screen container centered vertically and horizontally
    <div className="flex min-h-screen items-center justify-center bg-muted">

      {/* Content container for the error message */}
      <div className="text-center">

        {/* Large heading showing the error code */}
        <h1 className="mb-4 text-4xl font-bold">404</h1>

        {/* Description explaining the page was not found */}
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>

        {/* Link to navigate back to the home page */}
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>

      </div>
    </div>
  );
};

// Export the component so it can be used in routing
export default NotFound;