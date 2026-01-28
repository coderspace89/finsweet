import React from "react";
import Article from "@/app/components/Article";
import RelatedContent from "@/app/components/RelatedContent";
import JoinSection from "@/app/components/JoinSection";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <div>
      <Article slug={slug} />
      <RelatedContent slug={slug} />
      <JoinSection />
    </div>
  );
};

export default page;
