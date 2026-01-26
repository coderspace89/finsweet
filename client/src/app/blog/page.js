import React from "react";
import BlogHero from "../components/BlogHero";
import AllPosts from "../components/AllPosts";
import CategorySection from "../components/CategorySection";
import JoinSection from "../components/JoinSection";

const page = () => {
  return (
    <div>
      <BlogHero />
      <AllPosts />
      <CategorySection />
      <JoinSection />
    </div>
  );
};

export default page;
