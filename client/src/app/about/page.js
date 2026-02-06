import React from "react";
import AboutPageHero from "../components/AboutPageHero";
import AboutPageBlocks from "../components/AboutPageBlocks";
import AboutPageAuthors from "../components/AboutPageAuthors";
import JoinSection from "../components/JoinSection";

const page = () => {
  return (
    <div>
      <AboutPageHero />
      <AboutPageBlocks />
      <AboutPageAuthors />
      <JoinSection />
    </div>
  );
};

export default page;
