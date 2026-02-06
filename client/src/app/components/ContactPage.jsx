"use client";

import React, { useState, useEffect } from "react";
import contactPageStyles from "./ContactPage.module.css";
import qs from "qs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ContactPage = () => {
  const [contactData, setContactData] = useState([]);

  const queryParams = {
    populate: {
      contactInfoBlocks: {
        populate: {
          fields: ["blockTitle", "mainContent", "subContent"],
        },
      },
      queryOptions: {
        populate: {
          fields: ["label", "value"],
        },
      },
    },
  };

  const queryString = qs.stringify(queryParams, { encodeValuesOnly: true });

  useEffect(() => {
    const fetchBlocksData = async () => {
      const apiUrl = `http://localhost:1337/api/contact-page?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data);
      setContactData(data?.data);
    };
    fetchBlocksData();
  }, []);

  return (
    <section className={contactPageStyles.container}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className={contactPageStyles.heroContainer}>
              <p className={contactPageStyles.heroTitle}>
                {contactData?.heroTitle}
              </p>
              <h2 className={contactPageStyles.mainHeading}>
                {contactData?.mainHeading}
              </h2>
              <p className={contactPageStyles.heroDescription}>
                {contactData?.heroDescription}
              </p>
            </div>
            <Row className={contactPageStyles.infoBlockContainer}>
              {contactData?.contactInfoBlocks?.map((contactInfo) => (
                <Col lg={6} key={contactInfo.id}>
                  <div>
                    <p className={contactPageStyles.blockTitle}>
                      {contactInfo.blockTitle}
                    </p>
                    <h5 className={contactPageStyles.mainContent}>
                      <pre>{contactInfo.mainContent}</pre>
                    </h5>
                    <span className={contactPageStyles.subContent}>
                      {contactInfo.subContent}
                    </span>
                  </div>
                </Col>
              ))}
            </Row>
            <div>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    className={contactPageStyles.formInput}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="email"
                    placeholder="Your Email"
                    className={contactPageStyles.formInput}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Select
                    aria-label="Default select example"
                    className={contactPageStyles.formInput}
                  >
                    {contactData?.queryOptions?.map((queryOption) => (
                      <option key={queryOption.id} value={queryOption.value}>
                        {queryOption.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Message"
                    className={contactPageStyles.formInput}
                  />
                </Form.Group>
                <Button
                  variant="warning"
                  type="submit"
                  className={contactPageStyles.submitBtn}
                >
                  {contactData?.submitButtonText}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactPage;
