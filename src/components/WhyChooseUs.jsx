import React from "react";
import "./WhyChooseUs.css";

// Static data for the feature cards — easy to edit/add/remove cards here
const features = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    description:
      "We carefully package and deliver your PC components quickly and safely.",
  },
  {
    icon: "🛡",
    title: "Genuine Products",
    description:
      "Every product comes from trusted manufacturers to ensure quality and authenticity.",
  },
  {
    icon: "💳",
    title: "Secure Payment",
    description:
      "Enjoy a safe checkout experience with secure and reliable payment methods.",
  },
  {
    icon: "💬",
    title: "Customer Support",
    description:
      "Our support team is ready to help you choose the right components whenever you need assistance.",
  },
];

/**
 * WhyChooseUs
 * Trust-building section for TechParts Store highlighting key
 * advantages of shopping with the store.
 */
function WhyChooseUs() {
  return (
    <section className="why-choose-us" aria-labelledby="why-choose-us-title">
      <div className="why-choose-us__container">
        {/* Section header */}
        <div className="why-choose-us__header">
          <h2 id="why-choose-us-title" className="why-choose-us__title">
            Why Choose Us
          </h2>
          <p className="why-choose-us__subtitle">
            Discover why PC builders choose TechParts Store for reliable
            hardware, competitive pricing, and excellent customer service.
          </p>
        </div>

        {/* Feature cards */}
        <div className="why-choose-us__grid">
          {features.map((feature) => (
            <div className="why-choose-us__card" key={feature.title}>
              <div className="why-choose-us__icon-wrapper">
                <span className="why-choose-us__icon" role="img" aria-hidden="true">
                  {feature.icon}
                </span>
              </div>
              <h3 className="why-choose-us__card-title">{feature.title}</h3>
              <p className="why-choose-us__card-description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;