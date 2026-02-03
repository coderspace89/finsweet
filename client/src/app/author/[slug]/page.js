import React from "react";
import AuthorPage from "@/app/components/AuthorPage";

const page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);
  return (
    <div>
      <AuthorPage slug={slug} />
    </div>
  );
};

export default page;
