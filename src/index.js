import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
    {/* // Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
      <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);
