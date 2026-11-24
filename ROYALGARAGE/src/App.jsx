import { useEffect, useState } from "react";
import { ThemeProvider } from "@/Comp/theme-provider";

import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import AppRoutes from "./Comp/routes";

function App() {
  const location = useLocation();

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <main className=" w-full overflow-hidden bg-background text-foreground ">
          <AppRoutes />
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
