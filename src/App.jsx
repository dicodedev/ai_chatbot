import React from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Index />} />
        <Route path="/playground" element={<Dashboard />} />
        <Route path="*" element={<div>NOT FOUND</div>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
