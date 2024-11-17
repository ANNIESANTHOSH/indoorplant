import React, { useState, useEffect } from 'react';
import './Home.css';

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/images/plant1.jpg',
    '/images/plant2.jpg',
    '/images/plant3.jpg',
    '/images/plant4.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="homepage-container">
      {/* Main Content Area */}
      <div className="content">
        <h1 className="title">PLANTaE: Interior Landscaping & Plant Solutions</h1>
        <p className="subtitle">Enhance your living space with plants and personalized care services.</p>
        <button className="cta-button">Explore Catalog</button>
      </div>

      {/* Image Slider Section with Fade-in Effect */}
      <div className="image-slider">
        <div className="slides-container">
          <div className="slide" style={{ opacity: currentIndex === 0 ? 1 : 0 }}>
            <img src={images[0]} alt="Plant 1" />
          </div>
          <div className="slide" style={{ opacity: currentIndex === 1 ? 1 : 0 }}>
            <img src={images[1]} alt="Plant 2" />
          </div>
          <div className="slide" style={{ opacity: currentIndex === 2 ? 1 : 0 }}>
            <img src={images[2]} alt="Plant 3" />
          </div>
          <div className="slide" style={{ opacity: currentIndex === 3 ? 1 : 0 }}>
            <img src={images[3]} alt="Plant 4" />
          </div>
        </div>
      </div>

      {/* Featured Services and Other Sections */}
      <div className="featured-services">
        <h2>Our Featured Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <img src="/images/service1.jpg" alt="Service 1" />
            <h3>Indoor Planting</h3>
            <p>Transform your indoor spaces with custom plant arrangements.</p>
          </div>
          <div className="service-card">
            <img src="/images/service2.jpg" alt="Service 2" />
            <h3>Outdoor Landscaping</h3>
            <p>Create a green oasis with our professional landscaping services.</p>
          </div>
          <div className="service-card">
            <img src="/images/service3.jpg" alt="Service 3" />
            <h3>Plant Care Consultation</h3>
            <p>Get expert advice on how to care for your plants.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"PLANTaE transformed my apartment with beautiful plants and great service!"</p>
            <span>- Sarah, New York</span>
          </div>
          <div className="testimonial-card">
            <p>"I love my new garden, and the team at PLANTaE made the process so easy."</p>
            <span>- John, California</span>
          </div>
        </div>
      </div>

      {/* Bottom Call to Action */}
      <div className="bottom-cta">
        <h2>Ready to Create Your Green Space?</h2>
        <button className="cta-button">Book a Consultation</button>
      </div>
    </div>
  );
};

export default HomePage;
