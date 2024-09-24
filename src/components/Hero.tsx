// src/components/Hero.tsx

import "./Hero.css";

const Hero = ({
  title = "Unlock Your Future in NLP",
  subtitle =
    "Start your journey in natural language processing from here.",
}) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <a href="#home-card-section" className="hero-cta">Browse Jobs</a>
      </div>
    </section>
  );
};

export default Hero;
