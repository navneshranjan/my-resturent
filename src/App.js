import React from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header, MainContainer, CreateContainer } from "./components";

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary ">
        <Header />
        <main className="mt-24 w-full p-8">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createitem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
