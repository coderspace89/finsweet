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
          `http://localhost:1337/api/home-page?${query}`
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
                  href={`/category/${category.title.toLowerCase()}`}
                  className={categoryStyles.categoryLink}
                >
                  <div className={categoryStyles.iconBg}>
                    <Image
                      src={`http://localhost:1337${category.icon.url}`}
                      alt={category.title}
                      width={20}
                      height={20}
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
