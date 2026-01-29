"use client";

import React, { useState, useEffect } from "react";
import categoryPageStyles from "./CategoryPage.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";

const CategoryPage = ({ slug }) => {
  const [articlesData, setArticlesData] = useState([]);

  const categorySlug = slug;
  const query = qs.stringify(
    {
      filters: {
        category: {
          slug: {
            $eq: categorySlug,
          },
        },
      },
      populate: {
        image: true,
        author: true,
        category: true,
      },
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    },
  );

  useEffect(() => {
    const fetchArticles = async () => {
      const apiUrl = `http://localhost:1337/api/articles?${query}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data);
      setArticlesData(data?.data);
    };
    fetchArticles();
  }, []);

  return (
    <section className={categoryPageStyles.container}>
      <Container fluid>
        <Row className={`${categoryPageStyles.heroRow} justify-content-center`}>
          <Col lg={5}>
            {articlesData?.map((article, index) => (
              <div key={article.id} className="text-center">
                <h2 className={categoryPageStyles.heroTitle}>
                  {index === 0 ? article?.category?.name : ""}
                </h2>
                <p className={categoryPageStyles.heroDescription}>
                  {index === 0 ? article?.category?.description : ""}
                </p>
                <span className={categoryPageStyles.heroLink}>
                  <Link href="/blog">{index === 0 ? "Blog > " : ""}</Link>
                  {index === 0 ? article?.category?.name : ""}
                </span>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {articlesData?.map((article) => (
            <Col lg={8} key={article.id}>
              <div className="d-flex">
                {article?.image && (
                  <Image
                    src={`http://localhost:1337${article?.image?.url}`}
                    width={article?.image?.width}
                    height={article?.image?.height}
                    alt={article?.image?.name}
                    className="img-fluid"
                  />
                )}
                <div>
                  <p>{article?.category?.name}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CategoryPage;
