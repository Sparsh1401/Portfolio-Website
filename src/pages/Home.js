import React, { useEffect, useRef, useState } from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import GithubIcon from "@material-ui/icons/GitHub";
import { Typewriter } from 'react-simple-typewriter'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import gsap from 'gsap'
import Skills from "../components/Skills";
import SmoothScroll from "../components/SmoothScroll";
import ScrollRevealText from "../components/ScrollRevealText";
import ParallaxText from "../components/ParallaxText";
import CustomCursor from "../components/CustomCursor";
import VimTerminal from "../components/VimTerminal";
import DiagramPreview from "../components/DiagramPreview";
import "../styles/Home.css";
import DistributedSystemImg from "../assets/distributed_system.png";

function Home() {
  const heroRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isCardActive, setIsCardActive] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Scroll detection to hide loading screen
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Reduced threshold for easier exit
        setIsLoading(false);
        setTimeout(() => setShowContent(true), 500);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-title-word', {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.1,
        duration: 1.2,
        ease: 'back.out(1.7)',
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.social-icon', {
        opacity: 0,
        scale: 0,
        rotation: 360,
        stagger: 0.15,
        duration: 0.8,
        delay: 1.2,
        ease: 'elastic.out(1, 0.5)',
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isLoading]);

  const MagneticButton = ({ children, href, ...props }) => {
    const btnRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const spring = useSpring({
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      config: { tension: 150, friction: 15 },
    });

    return (
      <animated.a
        ref={btnRef}
        href={href}
        style={spring}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </animated.a>
    );
  };

  return (
    <>
      <CustomCursor />
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{
              clipPath: "circle(0% at 50% 50%)",
              transition: { duration: 1.2, ease: [0.65, 0.05, 0, 1] }
            }}
          >
            <motion.div
              className="loading-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Name and Title - Moved to Top for Better UX */}
              <div className="loading-header">
                <motion.h1
                  className="loading-title"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  SPARSH AGARWAL
                </motion.h1>
                <motion.div
                  className="loading-subtitle"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Backend Engineer • Data Platform Developer
                </motion.div>
              </div>

              {/* Visualizations Container */}
              <div className="loading-visuals">
                {/* Capabilities Card */}
                <motion.div
                  className={`capabilities-card ${isCardActive ? 'active' : ''}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  onClick={() => setIsCardActive(!isCardActive)}
                >
                  <div className="card-content">
                    <h3 className="capabilities-title">I Build</h3>
                    <ul className="capabilities-list">
                      <li>
                        <span className="capability-icon">⚡</span>
                        Distributed High-Scalable Systems
                      </li>
                      <li>
                        <span className="capability-icon">🌐</span>
                        Full-Stack Web Applications
                      </li>
                    </ul>
                    <motion.a
                      href="mailto:sparshagarwal811@gmail.com"
                      className="cta-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Let's Build Something
                    </motion.a>
                  </div>
                  
                  {/* System Overlay on Hover */}
                  <div className="system-overlay">
                    <img 
                      src={DistributedSystemImg} 
                      alt="Distributed System Architecture" 
                      className="system-image" 
                    />
                    <div className="request-particles">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="request-particle" style={{ animationDelay: `${i * 0.5}s` }} />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Server Visualization */}
                <motion.div
                  className="server-container"
                >
                  <div className="server-rack">
                    {/* API Server */}
                    <motion.div
                      className="server-unit"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <div className="server-header">
                        <div className="server-title">API Gateway</div>
                        <div className="server-status">
                          <div className="status-led green"></div>
                          <div className="status-led yellow"></div>
                          <div className="status-led blue"></div>
                        </div>
                      </div>
                      <div className="server-metrics">
                        <div className="metric-row">
                          <span className="metric-label">Throughput</span>
                          <span className="metric-value">50M/day</span>
                        </div>
                        <div className="metric-bar">
                          <motion.div
                            className="metric-fill"
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 1.5, delay: 1 }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Data Platform */}
                    <motion.div
                      className="server-unit"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                    >
                      <div className="server-header">
                        <div className="server-title">Data Platform</div>
                        <div className="server-status">
                          <div className="status-led green"></div>
                          <div className="status-led yellow"></div>
                          <div className="status-led blue"></div>
                        </div>
                      </div>
                      <div className="server-metrics">
                        <div className="metric-row">
                          <span className="metric-label">Processing</span>
                          <span className="metric-value">2TB/day</span>
                        </div>
                        <div className="metric-bar">
                          <motion.div
                            className="metric-fill"
                            initial={{ width: 0 }}
                            animate={{ width: '92%' }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="loading-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
              />
              
              <motion.div 
                className="scroll-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              >
                Scroll to Enter
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    <SmoothScroll>
    <div className="home">
      <motion.div
        className="about"
        ref={heroRef}
        style={{ y, opacity }}
      >
        {/* Animated Background Grid */}
        <div className="grid-background">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="grid-line"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: i * 0.05 }}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <motion.div className="floating-shape shape-1"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15, // Slower for less CPU usage
            repeat: Infinity,
            ease: "linear" // Linear is cheaper than easeInOut
          }}
        />
        <motion.div className="floating-shape shape-2"
          animate={{
            y: [0, 30, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 18, // Slower for less CPU usage
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="hero-content">
          <motion.div className="hero-label"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="status-dot"></span>
            Available for opportunities
          </motion.div>

          <h2 className="hero-title">
            <span className="hero-greeting">Hi, I'm</span>
            <div className="hero-name">
              {'Sparsh'.split('').map((char, i) => (
                <span key={i} className="hero-title-word">{char}</span>
              ))}
              {' '}
              {'Agarwal'.split('').map((char, i) => (
                <span key={i + 6} className="hero-title-word gradient-char">{char}</span>
              ))}
            </div>
          </h2>

          <motion.div
            className="hero-text hero-subtitle"
          >
            <Typewriter
              words={['Backend Engineer', 'Data Platform Developer', 'Software Developer - 2', 'Distributed Systems Expert']}
              loop={0}
              cursor
              cursorStyle='_'
              typeSpeed={80}
              deleteSpeed={60}
              delaySpeed={2000}
            />
          </motion.div>

          <motion.div className="prompt hero-subtitle">
            <VimTerminal />

            <div className="hero-description">
                <ScrollRevealText>
                  Crafting scalable backend systems and data platforms at Wingify
                </ScrollRevealText>
            </div>
            <p className="hero-stats">
              <span className="stat-item">
                <span className="stat-number">50M+</span>
                <span className="stat-label">Events/Day</span>
              </span>
              <span className="stat-divider">•</span>
              <span className="stat-item">
                <span className="stat-number">67%</span>
                <span className="stat-label">Faster</span>
              </span>
              <span className="stat-divider">•</span>
              <span className="stat-item">
                <span className="stat-number">2TB+</span>
                <span className="stat-label">Daily Data</span>
              </span>
            </p>

            <div className="social-links">
              <MagneticButton
                href="https://www.linkedin.com/in/sparsh-agarwal1401/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <LinkedInIcon />
              </MagneticButton>
              <MagneticButton
                href="mailto:sparshagarwal811@gmail.com"
                className="social-icon"
              >
                <EmailIcon />
              </MagneticButton>
              <MagneticButton
                href="https://github.com/Sparsh1401"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <GithubIcon />
              </MagneticButton>
            </div>

            <motion.a
              href="#skills"
              className="scroll-indicator"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span>Scroll to explore</span>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M10 15l-5-5h10l-5 5z" fill="currentColor" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll to reveal content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ margin: "4rem 0" }}>
          <ParallaxText baseVelocity={-5}>BACKEND ENGINEERING</ParallaxText>
          <ParallaxText baseVelocity={5}>DISTRIBUTED SYSTEMS</ParallaxText>
          <ParallaxText baseVelocity={-5}>DATA PLATFORM</ParallaxText>
        </div>

        <div id="skills" className="skills">
          <Skills />
        </div>
      </motion.div>
    </div>
    </SmoothScroll>
    </>
  );
}

export default Home;
