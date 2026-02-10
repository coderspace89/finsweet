"use client";

import React, { useState, useEffect } from "react";
import categoryStyles from "./CategorySection.module.css";
import qs from "qs";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  const query = qs.stringify({
    populate: {
      categories: {
        populate: ["icon"],
      },
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}/api/home-page?${query}`,
        );
        const data = await response.json();
        console.log(data);
        setCategories(data.data.categories || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className={categoryStyles.categorySection}>
      <Container>
        <Row>
          <div>
            <h2 className={categoryStyles.sectionTitle}>Choose A Category</h2>
          </div>
          {categories.map((category, index) => (
            <Col lg={3} key={index} className="mb-3 mb-lg-0">
              <div className={categoryStyles.categoryBox}>
                <Link
                  href={`blog/category/${category.title.toLowerCase()}`}
                  className={categoryStyles.categoryLink}
                >
                  <div className={categoryStyles.iconBg}>
                    <Image
                      src={`${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}${category.icon.url}`}
                      alt={category.title}
                      width={category.icon.width}
                      height={category.icon.height}
                    />
                  </div>
                  <h3 className={categoryStyles.categoryTitle}>
                    {category.title}
                  </h3>
                  <p className={categoryStyles.categoryDescription}>
                    {category.description}
                  </p>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CategorySection;
