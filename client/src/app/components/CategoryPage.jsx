"use client";

import React, { useState, useEffect } from "react";
import categoryPageStyles from "./CategoryPage.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getStrapiMedia } from "@/lib/utils";

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
      const apiUrl = `/api/articles?${query}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data);
      setArticlesData(data?.data);
    };
    fetchArticles();
  }, []);

  const router = useRouter();
  const currentPath = router.asPath || "/blog";
  const cleanedPath = currentPath.replace("category", "/");

  const [categories, setCategories] = useState([]);

  const queryCategory = qs.stringify({
    populate: {
      image: true,
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/categories?${queryCategory}`);
        const data = await response.json();
        console.log(data.data);
        setCategories(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryBgColor, setSelectedCategoryBgColor] = useState("");

  const handleCategoryClick = (categoryId, categoryColor) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryBgColor(categoryColor);
  };

  const [tagsData, setTagsData] = useState([]);

  const queryTag = qs.stringify({
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
        const response = await fetch(`/api/tags?${queryTag}`);
        const data = await response.json();
        console.log(data.data);
        setTagsData(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTags();
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
      <Container className={categoryPageStyles.articleContainer}>
        <Row>
          <Col lg={9}>
            {articlesData?.map((article) => (
              <Link
                href={`${cleanedPath}/${article?.slug}`}
                className="text-decoration-none"
                key={article.id}
              >
                <Row className="align-items-center">
                  <Col lg={5}>
                    {article?.image && (
                      <div className={categoryPageStyles.imageContainer}>
                        <Image
                          src={getStrapiMedia(article?.image?.url)}
                          width={article?.image?.width}
                          height={article?.image?.height}
                          alt={article?.image?.name}
                          className={categoryPageStyles.articleImage}
                        />
                      </div>
                    )}
                  </Col>
                  <Col lg={7}>
                    <div>
                      <p className={categoryPageStyles.categoryTitle}>
                        {article?.category?.name}
                      </p>
                      <h3 className={categoryPageStyles.articleTitle}>
                        {article?.title}
                      </h3>
                      <p className={categoryPageStyles.articleText}>
                        {article?.author?.bio}
                      </p>
                    </div>
                  </Col>
                </Row>
              </Link>
            ))}
          </Col>
          <Col lg={3}>
            <div>
              <h2 className={categoryPageStyles.categoryHeading}>Categories</h2>
            </div>
            {categories?.map((category) => (
              <Link
                target="_blank"
                href={category?.slug}
                key={category.id}
                className="text-decoration-none"
              >
                <div
                  className={categoryPageStyles.categoryItemsContainer}
                  onClick={() =>
                    handleCategoryClick(category.id, category?.color)
                  }
                  style={
                    category.id === selectedCategoryId
                      ? {
                          backgroundColor: selectedCategoryBgColor,
                          border: "1px solid #FFD050",
                        }
                      : { backgroundColor: "" }
                  }
                >
                  <div className="d-flex align-items-center justify-content-start">
                    {category?.image && (
                      <div className={categoryPageStyles.categoryIconBg}>
                        <Image
                          src={getStrapiMedia(category?.image?.url)}
                          width={category?.image?.width}
                          height={category?.image?.height}
                          alt={category?.image?.name}
                          className={categoryPageStyles.categoryIcon}
                        />
                      </div>
                    )}
                    <h2 className={categoryPageStyles.categoryItemsName}>
                      {category.name}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
            <div>
              <h2 className={categoryPageStyles.tagHeading}>All Tags</h2>
            </div>
            <div className={categoryPageStyles.tagContainer}>
              {tagsData.map((tag) => (
                <Link
                  href={`tag/${tag.slug}`}
                  target="_blank"
                  className="text-decoration-none"
                  key={tag.id}
                >
                  <div className={categoryPageStyles.tagItem}>
                    <span>{tag.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CategoryPage;
