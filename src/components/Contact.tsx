import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="section">
      <h1>Contact Me</h1>
      <div className="content">
        <form
          action="https://formspree.io/f/antibland@gmail.com"
          method="POST"
          className="contact-form"
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required rows={5} />
          </div>
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
