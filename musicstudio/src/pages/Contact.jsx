import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
          <Navbar />

    <div className="page-scroll bg-dark text-white min-vh-100">


      <div className="container py-5 contact-page">

        {/* HERO */}
        <div className="contact-hero text-center mb-4">
          <h1 className="fw-bold display-6">Get in Touch 📩</h1>
          <p className="text">
            Have feedback, suggestions, or just want to say hello?
          </p>
        </div>

        <div className="row g-4">

          {/* FORM */}
          <div className="col-12 col-lg-7">

            <div className="contact-form shadow-lg">

              <div className="form-group">
                <label>Your Name</label>
                <input
                  className="form-control form-control-dark"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="form-control form-control-dark"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-control form-control-dark"
                  name="message"
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                />
              </div>

              <button
                className={`btn btn-success w-100 rounded-pill fw-semibold mt-5 ${
                  sent ? "btn-sent" : ""
                }`}
                onClick={handleSubmit}
              >
                {sent ? "✓ Message Sent!" : "Send Message"}
              </button>
            </div>
          </div>

          {/* LINKS */}
          <div className="col-12 col-lg-5">

            <div className="contact-links">

              <a
                href="https://github.com"
                className="contact-link-card"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-github"></i>
                <div>
                  <span>GitHub</span>
                  <small> View source code</small>
                </div>
              </a>

              <a href="mailto:hello@example.com" className="contact-link-card">
                <i className="bi bi-envelope-fill"></i>
                <div>
                  <span>Email</span>
                  <small> hello@example.com</small>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                className="contact-link-card"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-linkedin"></i>
                <div>
                  <span>LinkedIn</span>
                  <small> Connect with me</small>
                </div>
              </a>

              <a
                href="https://twitter.com"
                className="contact-link-card"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-twitter-x"></i>
                <div>
                  <span>Twitter / X</span>
                  <small>  Follow updates</small>
                </div>
              </a>

            </div>

          </div>

        </div>
      </div>
            <Footer/>
      
    </div>
    </>
  );
}