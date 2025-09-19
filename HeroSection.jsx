import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const heroRef = useRef(null);
  const stackRef = useRef(null);

  // Efecto parallax sutil en el stack de imágenes
  useEffect(() => {
    const handleScroll = () => {
      if (stackRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        stackRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="hero" 
      className="hero"
      ref={heroRef}
      role="banner"
      aria-label="Presentación principal"
    >
      <div className="hero-container">
        {/* Contenido principal del hero */}
        <div className="hero-content">
          {/* Badge de presentación */}
          <div className="hero-badge" role="img" aria-label="Diseñadora UX/UI">
            <span className="badge-icon">✨</span>
            <span>Diseñadora UX/UI</span>
          </div>

          {/* Headline principal - Propuesta de valor clara */}
          <h1 className="hero-title">
            <span className="title-line">Creo</span>
            <span className="gradient-text">Experiencias Digitales</span>
            <span className="title-line">que Conectan</span>
          </h1>

          {/* Subheadline - Habilidades principales */}
          <p className="hero-description">
            Especializada en diseño centrado en el usuario, transformo ideas complejas 
            en interfaces intuitivas que generan impacto real y conexión emocional.
          </p>

          {/* Call-to-Actions optimizados */}
          <div className="hero-actions">
            <a 
              href="#portfolio" 
              className="cta-button primary"
              aria-label="Ver proyectos de portafolio"
            >
              <span>Ver Mi Trabajo</span>
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
            
            <a 
              href="#contact" 
              className="cta-button secondary"
              aria-label="Contactar para conversar sobre proyectos"
            >
              <span>Hablemos</span>
              <i className="fas fa-coffee" aria-hidden="true"></i>
            </a>
          </div>

     
        </div>

        {/* Componente visual mejorado */}
        <div className="hero-visual">
          <div 
            className="hero-image-stack" 
            ref={stackRef}
            role="img" 
            aria-label="Mockups de proyectos de diseño"
          >
            {/* Card principal con foto de perfil */}
            <div className="stack-item item-1 profile-card">
              <div className="profile-overlay">
                <div className="profile-content">
                  <div className="profile-avatar">
                    <img 
                      src="me.jpeg" 
                      alt="Foto de perfil de la diseñadora"
                      className="profile-image"
                    />
                  </div>
                  <div className="profile-info">
                    <h3>UX/UI Designer</h3>
                    <p>Experiencias que conectan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card secundaria con mockup */}
            <div className="stack-item item-2 mockup-card">
              <div className="mockup-content">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="mockup-body">
                  <div className="mockup-line"></div>
                  <div className="mockup-line short"></div>
                  <div className="mockup-line medium"></div>
                </div>
              </div>
            </div>

            {/* Card terciaria con iconos */}
            <div className="stack-item item-3 skills-card">
              <div className="skills-content">
                <div className="skill-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="skill-text">
                  <h4>Responsive</h4>
                  <p>Design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll mejorado */}
      <div className="hero-scroll-indicator" role="button" tabIndex="0">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
