// Import the function used to create a React root for rendering the application
import { createRoot } from "react-dom/client";

// Import the main App component which contains the entire application UI
import App from "./App.tsx";

// Import the global CSS styles for the project
import "./index.css";

// Select the HTML element with id "root" from index.html
// The "!" tells TypeScript that this element will definitely exist
createRoot(document.getElementById("root")!)

// Render the main App component inside the root element
.render(<App />);