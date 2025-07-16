import React, { useEffect } from "react";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import BlackSection from "./components/Home/BlackSection/BlackSection";

function App() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.height = "100%";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="w-full grid text-left gap-y-[8vh] mt-[8vh]">
        <BlackSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
