"use client";

import React, { useState, useEffect } from "react";
import articleStyles from "./Article.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStrapiMedia } from "@/lib/utils";

const Article = ({ slug }) => {
  const postSlug = slug;
  console.log(postSlug);

  const [articleData, setArticleData] = useState([]);

  const queryObj = {
    filters: {
      slug: {
        $eq: postSlug,
      },
    },
    populate: {
      image: true,
      category: {
        populate: ["image"],
      },
      author: {
        populate: ["image"],
      },
    },
  };
  const queryString = qs.stringify(queryObj, { encodeValuesOnly: true });

  useEffect(() => {
    const fetchArticle = async () => {
      const apiUrl = `/api/articles?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data);
      setArticleData(data?.data);
    };
    fetchArticle();
  }, []);

  function formatDate(dateString) {
    let date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  const router = useRouter();
  const currentPath = router.asPath || "/";
  const cleanedPath = currentPath.replace("blog", "/");

  return (
    <section className={articleStyles.articleContainer}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            {articleData.map((article) => (
              <div key={article.id}>
                <Link
                  href={`${cleanedPath}author/${article?.author?.slug}`}
                  className="text-decoration-none"
                >
                  <div
                    className={`${articleStyles.authorContainer} d-flex align-items-center`}
                  >
                    {article.author?.image && (
                      <Image
                        key={article.author.id}
                        src={getStrapiMedia(article.author.image.url)}
                        width={article.author.image.width}
                        height={article.author.image.height}
                        alt={
                          article.author.image.name ||
                          article.author.title ||
                          "Post Image"
                        }
                        className={articleStyles.authorImage}
                      />
                    )}
                    <div>
                      <h3 className={articleStyles.authorName}>
                        {article?.author?.name}
                      </h3>
                      <span className={articleStyles.articleDate}>
                        Posted on {formatDate(article.date)}
                      </span>
                    </div>
                  </div>
                </Link>
                <div>
                  <h2 className={articleStyles.articleTitle}>
                    {article?.title}
                  </h2>
                  <div className="d-flex align-items-center">
                    {article.category?.image && (
                      <Image
                        key={article.category.id}
                        src={getStrapiMedia(article.category.image.url)}
                        width={article.category.image.width}
                        height={article.category.image.height}
                        alt={
                          article.category.image.name ||
                          article.category.title ||
                          "Post Image"
                        }
                        className={articleStyles.categoryImage}
                      />
                    )}
                    <h4 className={articleStyles.categoryName}>
                      {article?.category?.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </Col>
          <Col lg={12}>
            {articleData.map((article) => (
              <div
                key={article.id}
                className={articleStyles.articleImageContainer}
              >
                {article?.image && (
                  <Image
                    key={article.author.id}
                    src={getStrapiMedia(article.image.url)}
                    width={article.image.width}
                    height={article.image.height}
                    alt={article.image.name || article.title || "Post Image"}
                    className={articleStyles.articleImage}
                  />
                )}
              </div>
            ))}
          </Col>
          <Col lg={8}>
            {articleData?.map((article) => (
              <div key={article.id}>
                <div className={articleStyles.markdownContainer}>
                  <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Article;
