import React from "react";
import { getAssetPath } from "../utils/assetPath";
import { usePageSeo } from "../utils/seo";

const Contact: React.FC = () => {
  usePageSeo({
    title: "Contact",
    description: "Get in touch with Andy Hoffman.",
    path: "/contact",
  });

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-heading-row">
        <img
          src={getAssetPath("andy-profile-scarf.webp")}
          srcSet={`${getAssetPath(
            "andy-profile-scarf.webp",
          )} 800w, ${getAssetPath("andy-profile-scarf@2x.webp")} 1600w`}
          sizes="64px"
          alt="Andy Hoffman"
          width="64"
          height="64"
          loading="eager"
          decoding="async"
          className="priority-image contact-heading-avatar"
        />
        <h1>Let's Talk</h1>
      </div>
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
    </section>
  );
};

export default Contact;
