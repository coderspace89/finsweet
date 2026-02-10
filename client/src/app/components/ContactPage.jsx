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
      const apiUrl = `${process.env.STRAPI_CLOUD_URL || process.env.STRAPI_LOCAL_URL}/api/contact-page?${queryString}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data?.data);
      setContactData(data?.data);
    };
    fetchBlocksData();
  }, []);

  // saving contact form submissions
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    queryRelated: "", // Set default from first option if available
    message: "",
  });
  const [status, setStatus] = useState(null); // 'success', 'error', 'submitting'
  const [responseMessage, setResponseMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setResponseMessage("");
    try {
      const response = await fetch("/api/contact", {
        // The API route we created
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setResponseMessage(data.message || "Thank you for your submission!");
        setFormData({
          // Clear form on success
          fullName: "",
          email: "",
          queryRelated: contactData?.queryOptions[0]?.value || "",
          message: "",
        });
      } else {
        setStatus("error");
        setResponseMessage(
          data.message || "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      console.error("Frontend submission error:", error);
      setStatus("error");
      setResponseMessage("Network error. Please check your connection.");
    }
  };

  console.log(formData);

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
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    className={contactPageStyles.formInput}
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Your Email"
                    className={contactPageStyles.formInput}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    className={contactPageStyles.formInput}
                    id="queryRelated"
                    name="queryRelated"
                    value={formData.queryRelated}
                    onChange={handleChange}
                    required
                  >
                    {contactData?.queryOptions?.map((queryOption) => (
                      <option key={queryOption.id} value={queryOption.value}>
                        {queryOption.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Message"
                    className={contactPageStyles.formInput}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button
                  variant="warning"
                  type="submit"
                  className={contactPageStyles.submitBtn}
                  disabled={status === "submitting"}
                >
                  {status === "submitting"
                    ? "Submitting..."
                    : contactData?.submitButtonText || "Send Message"}
                </Button>
                {status && responseMessage && (
                  <p
                    className={
                      status === "success" ? "text-success" : "text-danger"
                    }
                  >
                    {responseMessage}
                  </p>
                )}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactPage;
