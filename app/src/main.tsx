import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <Routes>
          <Route path="/:currentVideoId" element={<App />} />
          <Route path="*" element={<Navigate to="/1" replace />} />
        </Routes>
      </QueryClientProvider>
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>,
)
