import React from "react";
import Article from "@/app/components/Article";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <div>
      <Article slug={slug} />
    </div>
  );
};

export default page;
