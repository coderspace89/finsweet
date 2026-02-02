"use client";

import React, { useState, useEffect } from "react";
import tagPageStyles from "./TagPage.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TagPage = ({ slug }) => {
  const tagSlug = slug;

  const [tagsData, setTagsData] = useState([]);

  const queryTag = qs.stringify({
    filters: {
      slug: {
        $eq: tagSlug,
      },
    },
    populate: {
      articles: {
        populate: {
          image: true,
        },
      },
    },
  });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/tags?${queryTag}`,
        );
        const data = await response.json();
        console.log(data.data);
        setTagsData(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();
  }, []);

  const router = useRouter();
  const currentPath = router.asPath || "/blog";
  const cleanedPath = currentPath.replace("category", "/");

  return (
    <section className={tagPageStyles.tagPageContainer}>
      <Container>
        {tagsData[0]?.articles.map((article) => (
          <Link
            key={article.id}
            href={`${cleanedPath}/${article?.slug}`}
            className="text-decoration-none"
          >
            <Row>
              <Col lg={5}>
                <div className={tagPageStyles.articleImageContainer}>
                  {article?.image && (
                    <Image
                      src={`http://localhost:1337${article?.image?.url}`}
                      width={article?.image?.width}
                      height={article?.image?.height}
                      alt={article?.image?.name}
                      className={tagPageStyles.articleImage}
                    />
                  )}
                </div>
              </Col>
              <Col lg={7}>
                {tagsData.map((tag) => (
                  <div key={tag.id}>
                    <p className={tagPageStyles.tagTitle}>{tag.name}</p>
                  </div>
                ))}
                <div>
                  <h2 className={tagPageStyles.articleTitle}>
                    {article.title}
                  </h2>
                </div>
              </Col>
            </Row>
          </Link>
        ))}
      </Container>
    </section>
  );
};

export default TagPage;
