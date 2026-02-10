"use client";

import React, { useState, useEffect } from "react";
import blogHeroStyles from "./BlogHero.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const BlogHero = () => {
  const [blogHeroData, setBlogHeroData] = useState({});

  const queryObj = {
    populate: {
      featuredPost: {
        populate: {
          image: true,
        },
      },
    },
  };
  const queryString = qs.stringify(queryObj, { encodeValuesOnly: true });

  useEffect(() => {
    const fetchBlogHero = async () => {
      const apiUrl = `/api/blog-page?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data);
      setBlogHeroData(data?.data);
    };
    fetchBlogHero();
  }, []);

  function formatDate(dateString) {
    let date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  const imageUrl = getStrapiMedia(blogHeroData?.featuredPost?.image?.url);

  return (
    <section className={blogHeroStyles.sectionBg}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-g-0 mb-3">
            <div>
              <p className={blogHeroStyles.labelText}>
                {blogHeroData?.featuredPostLabel}
              </p>
              <h2 className={blogHeroStyles.heading}>
                {blogHeroData?.featuredPost?.title}
              </h2>
              <p className={blogHeroStyles.authorNdate}>
                By <span>{blogHeroData?.featuredPost?.author}</span> |{" "}
                {formatDate(blogHeroData?.featuredPost?.date)}
              </p>
              <p className={blogHeroStyles.description}>
                {blogHeroData?.featuredPost?.content}
              </p>
              <Button variant="warning" className={blogHeroStyles.heroBtn}>
                {blogHeroData?.featuredPost?.cta}
              </Button>
            </div>
          </Col>
          <Col lg={6}>
            <div>
              {blogHeroData?.featuredPost?.image && (
                <Image
                  src={imageUrl}
                  width={blogHeroData?.featuredPost?.image?.width}
                  height={blogHeroData?.featuredPost?.image?.height}
                  className={blogHeroStyles.heroImage}
                  alt={blogHeroData?.featuredPost?.image?.name}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BlogHero;
