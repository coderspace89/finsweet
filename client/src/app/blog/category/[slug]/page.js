import React from "react";
import CategoryPage from "@/app/components/CategoryPage";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <div>
      <CategoryPage slug={slug} />
    </div>
  );
};

export default page;
