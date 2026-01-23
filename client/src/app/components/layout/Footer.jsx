"use client";

import React, { useEffect, useState } from "react";
import footerStyles from "./Footer.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import qs from "qs";
import Image from "next/image";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Footer = () => {
  const [footerData, setFooterData] = useState({});

  const queryObj = {
    populate: {
      Footer: {
        populate: {
          image: true,
          navigation: true,
          SocialLinks: {
            populate: ["icon"],
          },
          Signup: true,
        },
      },
    },
  };

  const queryString = qs.stringify(queryObj, { encodeValuesOnly: true });

  async function FooterSection() {
    const apiUrl = `http://localhost:1337/api/global?${queryString}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data?.data?.Footer);
    setFooterData(data?.data?.Footer);
  }

  useEffect(() => {
    FooterSection();
  }, []);

  return (
    <section className={footerStyles.footerSection}>
      <Container className={footerStyles.footerContainer}>
        <Row>
          <Col>
            <div
              className={`d-flex justify-content-between flex-lg-row flex-column align-items-center ${footerStyles.footerTop}`}
            >
              {footerData?.image && (
                <Image
                  src={`http://localhost:1337${footerData.image.url}`}
                  width={footerData.image.width}
                  height={footerData.image.height}
                  alt={footerData.logoText}
                  className="mb-lg-0 mb-3"
                />
              )}
              <div className="d-flex">
                {footerData?.navigation?.map((item, index) => (
                  <div key={index}>
                    <Link
                      className="text-decoration-none text-white me-lg-4 me-3"
                      href={item.href}
                    >
                      {item.text}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <Row className={`${footerStyles.signupBg}`}>
              <Col lg={6}>
                <div className="mb-lg-0 mb-3">
                  <h2 className={footerStyles.heading}>
                    {footerData?.Signup?.heading}
                  </h2>
                </div>
              </Col>
              <Col lg={6}>
                <Form>
                  <Row>
                    <Col lg={8}>
                      <Form.Control
                        placeholder={footerData?.Signup?.emailPlaceholder}
                        className={`bg-transparent mb-lg-0 mb-3 ${footerStyles.formInput}`}
                      />
                    </Col>
                    <Col lg={4}>
                      <Button
                        variant="warning"
                        type="submit"
                        className={footerStyles.formButton}
                      >
                        {footerData?.Signup?.buttonText}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <div className="d-flex justify-content-between flex-lg-row flex-column align-items-lg-start align-items-center">
              <div>
                <p className="text-white-50 mb-0 text-lg-start text-center">
                  {footerData?.address}
                </p>
                <p className="text-white-50">
                  {footerData?.email} {footerData?.phone}
                </p>
              </div>
              <div>
                {footerData?.SocialLinks?.map((item, index) => (
                  <Link key={index} href={item.url}>
                    <Image
                      src={`http://localhost:1337${item.icon.url}`}
                      width={item.icon.width}
                      height={item.icon.height}
                      alt={item.icon.name}
                      className="me-4"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
