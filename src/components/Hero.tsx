// src/components/Hero.tsx

import "./Hero.css";

const Hero = () => {
  const title = "Unlock Your Future in NLP";
  const subtitle =
    "Start your journey in natural language processing with the top companies.";

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <button className="hero-cta">Browse Jobs</button>
      </div>
    </section>
  );
};

export default Hero;
