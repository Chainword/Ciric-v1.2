import React, { useEffect } from "react";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import HeroSlider from "./components/Home/HeroSlider/HeroSlider";
import ContentGrid from "./components/Home/ContentGrid/ContentGrid";
import StunningSection from "./components/Home/StunningSection/stunningsection";
/* import ProjectsBlock from "./components/Home/ProjectsBlock/ProjectsBlock"; */
import InSituCards from "./components/Home/InSituCards/InSituCards";
import { inSituCards } from "./components/Home/InSituCards/inSituData";

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
        <section className="w-full">
          <HeroSlider />
        </section>
        <section className="w-full bg-inherit">
          <StunningSection />
        </section>
        <section className="w-full bg-inherit hidden">
          <ContentGrid />
        </section>
        {/* <section className="w-full bg-inherit">
          <ProjectsBlock />
        </section> */}
        {/* ----------- SECTION INSITUCARDS ----------- */}
        <section className="w-full bg-inherit">
          <InSituCards cards={inSituCards} />
        </section>
        {/* ----------- /SECTION INSITUCARDS ---------- */}
        <div className="w-full h-[4vh] hidden" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
