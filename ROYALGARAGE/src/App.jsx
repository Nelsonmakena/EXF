import { useEffect, useState } from "react";
import { ThemeProvider } from "@/comp/theme-provider";

import AOS from "aos";
import "aos/dist/aos.css";

import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import Routess from "./Comp/Routes";

function App() {
  const location = useLocation();
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation speed
      once: false, // animate only once
      mirror: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className=" w-full overflow-hidden bg-background text-foreground ">
          <Routess />
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
