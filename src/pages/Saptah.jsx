import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Sparkles, Heart, Users, Shield, Waves, Mountain, BookOpen, Flame } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Saptah.css';

/* ═══════ HERO SECTION ═══════ */
const HERO_VIDEO_START = 218; // 3:36
const HERO_VIDEO_END = 252;   // 4:12

const HeroSection = () => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const videoReady = useRef(false);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existing) document.head.appendChild(tag);

    const createPlayer = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: '_Sj-tf26TcY',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          start: HERO_VIDEO_START,
          end: HERO_VIDEO_END,
          loop: 0,
        },
        events: {
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING && !videoReady.current) {
              videoReady.current = true;
              const iframe = playerRef.current.getIframe();
              if (iframe) iframe.style.opacity = '1';
            }
            if (e.data === window.YT.PlayerState.ENDED) {
              playerRef.current.seekTo(HERO_VIDEO_START, true);
              playerRef.current.playVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy();
    };
  }, []);

  return (
    <section className="saptah-hero">
      <div className="saptah-hero-bg">
        <div ref={containerRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, transition: 'opacity 0.8s ease' }} />
        <div className="saptah-hero-overlay" />
      </div>

      <span className="saptah-om-bg" style={{ top: '10%', left: '5%', fontSize: '200px', color: 'hsla(25,45%,25%,0.03)' }}>&#x0950;</span>
      <span className="saptah-om-bg" style={{ bottom: '10%', right: '5%', fontSize: '150px', color: 'hsla(25,45%,25%,0.03)', animationDelay: '3s' }}>&#x0950;</span>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, hsl(25,45%,25%), transparent)', opacity: 0.6 }} />

      <div className="saptah-hero-content">
        <motion.div
          className="saptah-divider-ornate"
          style={{ maxWidth: '200px', margin: '0 auto 32px' }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span style={{ color: '#B97A3D', fontSize: '18px' }}>&#x2619;</span>
        </motion.div>

        <motion.h1
          className="saptah-hero-h1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          A Sacred Pause for the People
          <br />
          <span className="saptah-hero-emphasis">Building the World of Trade</span>
        </motion.h1>

        <motion.p
          className="saptah-hero-support"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          At Aaziko Global LLP, we work every day to connect businesses, build trust across borders, and create meaningful trade opportunities. But beyond business, we also believe that true growth includes peace of mind, clarity of thought, strong values, and spiritual grounding. That is why we are organizing a <strong style={{ color: '#B97A3D' }}>Bhagwat Saptah in Rishikesh</strong>, on the holy banks of Maa Ganga.
        </motion.p>

        <motion.div
          className="saptah-hero-badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { icon: Sparkles, text: '7-Day Spiritual Journey' },
            { icon: Heart, text: 'Sacred Teachings' },
            { icon: Users, text: 'Family Welcome' }
          ].map((f, i) => (
            <div key={i} className="saptah-hero-badge">
              <f.icon />
              <span>{f.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          style={{ marginTop: '24px' }}
        >
          <span className="saptah-section-label">&#x2726; &#x0936;&#x094D;&#x0930;&#x0940; &#x2726; BHAGWAT SAPTAH BY AAZIKO GLOBAL LLP &#x2726; &#x0936;&#x094D;&#x0930;&#x0940; &#x2726;</span>
        </motion.div>
      </div>

      <div className="saptah-hero-bottom" />
      <div className="saptah-scroll-indicator">
        <div className="saptah-scroll-dot">
          <div className="saptah-scroll-dot-inner" />
        </div>
      </div>
    </section>
  );
};

/* ═══════ TRUE CORE / ABOUT SECTION ═══════ */
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="saptah-section-cream" ref={ref}>
      <span className="saptah-om-bg" style={{ top: '5%', right: '10%', fontSize: '300px', color: '#8b7355', opacity: 0.2 }}>&#x0950;</span>
      <div className="saptah-container" style={{ textAlign: 'center' }}>
        <motion.p className="saptah-label-gold" style={{ marginBottom: '12px' }} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
          &#x2726; Our Philosophy &#x2726;
        </motion.p>
        <motion.h2 className="saptah-heading-spiritual" style={{ fontSize: 'clamp(28px, 5vw, 60px)', marginBottom: '16px' }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          About the Bhagwat Saptah
        </motion.h2>
        <motion.div className="saptah-divider-gold" style={{ marginBottom: '48px' }} initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }} />

        <motion.div className="saptah-flex-row" style={{ marginTop: '32px', alignItems: 'flex-start' }} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
          <div style={{ flexShrink: 0 }}>
            <img src="/saptah/jjjjjj.png" alt="Family Portrait" style={{ width: '100%', maxWidth: '450px', borderRadius: '8px', objectFit: 'cover', border: '2px solid hsla(25,45%,25%,0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} />
          </div>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <p className="saptah-paragraph-body" style={{ marginBottom: '20px', color: 'hsl(20,10%,45%)' }}>
              This Bhagwat Saptah is a heartfelt spiritual initiative by Aaziko Global LLP. In the fast-moving world of import-export, global trade, logistics, sourcing, negotiations, and business commitments, life often becomes focused only on movement, targets, and responsibilities.
            </p>
            <p className="saptah-paragraph-body" style={{ color: 'hsl(20,10%,45%)' }}>
              Through this sacred gathering in Rishikesh, we want to create a peaceful space where people can step away from daily pressure and reconnect with <em style={{ color: 'var(--s-maroon)', fontWeight: 500, fontStyle: 'normal' }}>devotion, wisdom, and inner balance</em>. Through the divine teachings of Shrimad Bhagwat, sacred atmosphere, satsang, and the presence of the holy Ganga, this event is meant to offer emotional peace, spiritual strength, and a deeper understanding of life.
            </p>
            <div className="saptah-divider-ornate" style={{ maxWidth: '200px' }}>
              <span style={{ color: 'var(--s-gold)', fontSize: '12px' }}>&#x2619;</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════ AAZIKO PURPOSE SECTION ═══════ */
const PurposeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="saptah-section-cream" ref={ref}>
      <div className="saptah-container" style={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            <Shield style={{ width: 32, height: 32, color: '#A86B34' }} />
          </div>
          <p className="saptah-section-label" style={{ marginBottom: '12px' }}>OUR PURPOSE</p>
          <h2 className="saptah-section-h2" style={{ marginBottom: '16px' }}>Connecting Global Markets with Trust and Excellence</h2>
        </motion.div>

        <motion.div style={{ marginTop: '32px', textAlign: 'left' }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          <p className="saptah-paragraph-body" style={{ marginBottom: '24px' }}>
            At Aaziko Global LLP, we have always believed that true success in global trade goes beyond transactions. Yes, we facilitate seamless import and export operations, connect businesses across borders, and help companies expand their reach in international markets.
          </p>
          <p className="saptah-paragraph-body">
            But we also understand something deeper — building lasting partnerships, ensuring quality and compliance, and creating sustainable growth matter just as much.
          </p>
        </motion.div>

        <motion.div style={{ marginTop: '48px' }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
          <p className="saptah-section-intro" style={{ fontSize: '18px', color: '#A86B34', marginBottom: '40px' }}>
            Our commitment is to provide comprehensive import-export solutions, navigate complex international regulations, and help businesses thrive in the global marketplace with integrity and expertise.
          </p>
          <div className="saptah-divider-gold" style={{ margin: '40px auto' }} />
          <div>
            <p className="saptah-card-title" style={{ color: '#B97A3D', fontSize: '24px', marginBottom: '12px' }}>Excellence in Global Trade</p>
            <p className="saptah-section-intro">Your trusted partner in international commerce</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════ SPIRITUAL GUIDE SECTION ═══════ */
const SpiritualGuideSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="saptah-section-maroon" ref={ref}>
      <span className="saptah-om-bg" style={{ top: '5%', left: '5%', fontSize: '250px', color: 'hsla(25,45%,25%,0.03)' }}>&#x0950;</span>
      <div className="saptah-container-lg">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.9 }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="saptah-section-label" style={{ marginBottom: '12px' }}>&#x2726; YOUR SPIRITUAL GUIDE &#x2726;</p>
            <p className="saptah-section-intro" style={{ marginBottom: '16px' }}>Experience the divine narration of Shreemad Bhagavat by a master storyteller</p>
            <div className="saptah-divider-gold" style={{ marginTop: '32px', background: 'linear-gradient(90deg, transparent, hsla(25,45%,25%,0.5), transparent)' }} />
          </div>

          <div className="saptah-flex-row" style={{ gap: '48px' }}>
            <motion.div style={{ flex: '0 0 50%', maxWidth: '50%' }} initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 1.1 }}>
              <div className="saptah-speaker-frame">
                <div className="saptah-speaker-inner">
                  <div className="saptah-speaker-corner saptah-speaker-corner-tl" />
                  <div className="saptah-speaker-corner saptah-speaker-corner-tr" />
                  <div className="saptah-speaker-corner saptah-speaker-corner-bl" />
                  <div className="saptah-speaker-corner saptah-speaker-corner-br" />
                  <img src="/saptah/Ved-Vyas-tirth.jpg" alt="Sharad (Dada) Vyas - Katha Speaker" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '2px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }} />
                </div>
              </div>
            </motion.div>

            <motion.div style={{ flex: '0 0 50%', maxWidth: '50%' }} initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 1.3 }}>
              <div style={{ marginBottom: '8px' }}>
                <h4 style={{ fontFamily: 'var(--s-font-heading)', color: '#2C1810', fontSize: 'clamp(32px, 3vw, 40px)', fontWeight: 600, lineHeight: 1.1 }}>Sharad (Dada) Vyas</h4>
                <p style={{ fontFamily: 'var(--s-font-body)', color: '#5A4A3A', fontSize: '15px', marginTop: '4px' }}>&#x0AB6;&#x0AB0;&#x0AA6; (&#x0AA6;&#x0ABE;&#x0AA6;&#x0ABE;) &#x0AB5;&#x0ACD;&#x0AAF;&#x0ABE;&#x0AB8;</p>
                <p style={{ fontFamily: 'var(--s-font-body)', color: '#7D6758', fontSize: '14px' }}>Dharampur</p>
              </div>
              <div style={{ textAlign: 'left', paddingTop: '16px' }}>
                <p style={{ fontFamily: 'var(--s-font-body)', color: '#3D2F24', fontSize: '15px', lineHeight: 1.75, marginBottom: '16px' }}>
                  A beloved Katha Gayak known for his deep knowledge of Shreemad Bhagavat and his gift for making ancient wisdom feel relevant to modern life. Sharad Dada's storytelling is more than just words—it's a joyful, transformative experience.
                </p>
                <p style={{ fontFamily: 'var(--s-font-body)', color: '#3D2F24', fontSize: '15px', lineHeight: 1.75 }}>
                  With many years of experience and a warm understanding of Vedic teachings, Dada has touched countless hearts around the world, sharing the timeless wisdom of Lord Krishna with devotees everywhere.
                </p>
              </div>
              <div className="saptah-grid-2" style={{ paddingTop: '24px' }}>
                {[
                  { value: '740+', label: 'Kathas Delivered', desc: 'Shreemad Bhagavat Kathas completed' },
                  { value: '130+', label: 'International Kathas', desc: 'Conducted on international soil' },
                  { value: 'Oman, UK, USA', label: 'Countries', desc: 'Travels abroad 2 months yearly', small: true },
                  { value: '25+ Years', label: 'Experience', desc: 'Of spiritual guidance' }
                ].map((s, i) => (
                  <div key={i} className="saptah-stat-card">
                    <p style={{ fontFamily: 'var(--s-font-heading)', color: '#2C1810', fontSize: s.small ? '20px' : '32px', fontWeight: 600, lineHeight: 1.1 }}>{s.value}</p>
                    <p style={{ fontFamily: 'var(--s-font-body)', color: '#A86B34', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '8px' }}>{s.label}</p>
                    <p style={{ fontFamily: 'var(--s-font-body)', color: '#5A4A3A', fontSize: '13px', marginTop: '4px', lineHeight: 1.4 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════ INVITATION SECTION ═══════ */
const InvitationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="saptah-section-cream" ref={ref}>
      <span className="saptah-om-bg" style={{ bottom: '5%', left: '5%', fontSize: '250px', color: 'hsla(25,45%,25%,0.03)' }}>&#x0950;</span>
      <div className="saptah-container" style={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="saptah-heading-spiritual" style={{ fontSize: 'clamp(28px, 5vw, 60px)', marginBottom: '16px' }}>
            A Warm Invitation
            <br />
            <span style={{ color: 'var(--s-gold)', fontStyle: 'italic', fontSize: '0.7em' }}>from Aaziko Global LLP</span>
          </h2>
          <div className="saptah-divider-ornate" style={{ maxWidth: '200px', margin: '0 auto 32px' }}>
            <span style={{ color: 'var(--s-gold)', fontSize: '14px' }}>&#x2726;</span>
          </div>
        </motion.div>

        <motion.div
          className="saptah-sacred-card saptah-invitation-card"
          style={{ marginTop: '32px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="saptah-invitation-content">
            <p style={{ fontFamily: 'var(--s-font-heading)', fontSize: '24px', color: 'var(--s-maroon)', fontStyle: 'italic', marginBottom: '24px', textAlign: 'center' }}>"With folded hands and heartfelt respect,"</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ color: 'hsl(20,10%,45%)', fontFamily: 'var(--s-font-body)', fontSize: '14px', lineHeight: 1.9 }}>
                At Aaziko, we work to build strong bridges across countries through trade. But we also believe that the strongest bridges in life are built through <em style={{ color: 'var(--s-maroon)', fontWeight: 500, fontStyle: 'normal' }}>trust, values, and inner strength</em>.
              </p>
              <p style={{ color: 'hsl(20,10%,45%)', fontFamily: 'var(--s-font-body)', fontSize: '14px', lineHeight: 1.9 }}>
                This Bhagwat Saptah is an expression of that belief. This gathering has been organized with devotion, care, and a genuine intention to create a meaningful spiritual experience for all who attend. We would be honored by your presence.
              </p>
              <p style={{ color: 'hsl(20,10%,45%)', fontFamily: 'var(--s-font-body)', fontSize: '14px', lineHeight: 1.9 }}>
                Come not as a guest, but as part of a shared journey toward peace, wisdom, and grace. May this gathering bring peace to the mind, strength to the heart, clarity to the path ahead, and <strong style={{ color: 'var(--s-maroon)' }}>blessings to every family connected with it</strong>.
              </p>
            </div>
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid hsla(25,45%,25%,0.15)', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--s-font-heading)', fontSize: '20px', color: 'var(--s-maroon)', fontStyle: 'italic' }}>With warmth and respect,</p>
              <p style={{ fontFamily: 'var(--s-font-heading)', fontSize: '18px', color: 'var(--s-gold)', marginTop: '4px' }}>— The Aaziko Family</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════ FAMILY EXPERIENCE SECTION ═══════ */
const FamilyExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const experiences = [
    { img: '/saptah/ashram.jpg', title: 'Traditional Ashram Life', desc: 'Experience the rhythm of ancient wisdom in a serene communal setting', tag: '\u0906\u0936\u094D\u0930\u092E' },
    { img: '/saptah/meditation.jpg', title: 'Riverside Meditation', desc: 'Find inner stillness by the sacred waters of the Ganges at dawn', tag: '\u0927\u094D\u092F\u093E\u0928' },
    { img: '/saptah/aarti-ceremony.jpg', title: 'Sacred Fire Ceremonies', desc: 'Participate in transformative aarti rituals passed down for millennia', tag: '\u0906\u0930\u0924\u0940' }
  ];

  return (
    <section className="saptah-section-cream" ref={ref}>
      <div className="saptah-container-lg">
        <motion.div style={{ textAlign: 'center', marginBottom: '48px' }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <p className="saptah-section-label" style={{ marginBottom: '12px' }}>&#x2726; FOR THE ENTIRE FAMILY &#x2726;</p>
          <h2 className="saptah-section-h2" style={{ marginBottom: '16px' }}>A Beautiful Experience for Your Whole Family</h2>
          <div className="saptah-divider-gold" style={{ marginTop: '16px' }} />
          <p className="saptah-section-intro" style={{ maxWidth: '640px', margin: '32px auto 0' }}>
            This retreat welcomes families of all ages — children, parents, and grandparents — creating bonds through shared spiritual discovery.
          </p>
        </motion.div>

        <div className="saptah-grid-3">
          {experiences.map((exp, i) => (
            <motion.div key={i} className="saptah-experience-card" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}>
              <div className="saptah-sacred-frame">
                <div style={{ overflow: 'hidden', borderRadius: '2px' }}>
                  <img src={exp.img} alt={exp.title} />
                  <div className="saptah-experience-overlay" />
                  <span className="saptah-experience-tag">{exp.tag}</span>
                </div>
              </div>
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <h4 className="saptah-card-title" style={{ marginBottom: '12px' }}>{exp.title}</h4>
                <p className="saptah-card-body" style={{ maxWidth: '300px', margin: '0 auto' }}>{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════ WHY RISHIKESH SECTION ═══════ */
const WhyRishikeshSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const highlights = [
    { icon: Waves, text: 'Sacred Ganges flowing through the city' },
    { icon: Mountain, text: 'Nestled in the Himalayan foothills' },
    { icon: Sparkles, text: 'Yoga Capital of the World' }
  ];

  return (
    <section className="saptah-section-maroon" ref={ref}>
      <span className="saptah-om-bg" style={{ top: '10%', right: '5%', fontSize: '350px', color: 'hsla(25,45%,25%,0.02)' }}>&#x0950;</span>
      <div className="saptah-container-lg">
        <div className="saptah-flex-row" style={{ gap: '64px' }}>
          <motion.div style={{ flex: 1 }} initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <p className="saptah-section-label" style={{ marginBottom: '12px' }}>&#x2726; THE SACRED LAND &#x2726;</p>
            <h2 className="saptah-section-h2" style={{ marginBottom: '16px' }}>
              Why We Chose <span className="saptah-hero-emphasis" style={{ fontStyle: 'italic' }}>Rishikesh</span>
            </h2>
            <div style={{ width: '64px', height: '1px', background: 'linear-gradient(to right, var(--s-gold), transparent)', margin: '32px 0' }} />
            <div style={{ textAlign: 'left' }}>
              <p className="saptah-paragraph-body" style={{ marginBottom: '24px' }}>
                Rishikesh is not just a destination — it is an experience of calm, purity, and spiritual awakening. Surrounded by the sacred flow of Maa Ganga, temples, devotion, and a deeply peaceful atmosphere, Rishikesh offers the perfect setting for a Bhagwat Saptah.
              </p>
              <p className="saptah-paragraph-body">
                It is a place where the noise of daily life naturally becomes quiet, and the mind becomes more open to <em className="saptah-hero-emphasis" style={{ fontStyle: 'normal' }}>reflection, prayer, and peace</em>. For a gathering built around spiritual nourishment and meaningful inner connection, there could be no better place.
              </p>
            </div>
            <div style={{ paddingTop: '16px' }}>
              {highlights.map((h, i) => (
                <motion.div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid hsla(25,45%,25%,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <h.icon style={{ width: 16, height: 16, color: '#B97A3D' }} />
                  </div>
                  <span className="saptah-stat-label">{h.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ flex: 1 }} initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="saptah-sacred-frame">
              <img src="/saptah/rishikesh.jpg" alt="Rishikesh - Sacred City by the Ganges" style={{ width: '100%', borderRadius: '2px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ═══════ EXPERIENCE SACRED SECTION ═══════ */
const ExperienceSacredSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const sacred = [
    { icon: Heart, title: 'Refresh Your Mind', sanskrit: '\u092E\u0928', desc: '10 days to disconnect from routine stress and refresh your mind through divine teachings and peaceful surroundings' },
    { icon: BookOpen, title: 'Find Inner Peace', sanskrit: '\u0936\u093E\u0928\u094D\u0924\u093F', desc: 'Experience deep tranquility through Bhagwat Katha, meditation, and the sacred presence of Maa Ganga' },
    { icon: Flame, title: 'Positive Transformation', sanskrit: '\u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928', desc: 'Create lasting positive changes in your life through spiritual wisdom and devotional practices' },
    { icon: Mountain, title: 'Spiritual Growth', sanskrit: '\u0935\u093F\u0915\u093E\u0938', desc: 'Immerse yourself in 10 days of spiritual learning, self-reflection, and personal growth' }
  ];

  return (
    <section className="saptah-section-cream" ref={ref}>
      <div className="saptah-container-lg" style={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <p className="saptah-label-gold" style={{ marginBottom: '12px' }}>&#x2726; What You Will Experience &#x2726;</p>
          <h2 className="saptah-heading-spiritual" style={{ fontSize: 'clamp(28px, 5vw, 60px)', marginBottom: '16px' }}>Transform Your Life in 10 Days</h2>
          <div className="saptah-divider-gold" style={{ marginBottom: '16px' }} />
          <p style={{ color: 'hsl(20,10%,45%)', fontFamily: 'var(--s-font-body)', fontSize: '14px', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7, marginBottom: '48px' }}>
            Join us for a 10-day spiritual journey designed to refresh your mind, bring lasting peace, and create positive changes in your life. Experience the power of Bhagwat Katha in the sacred atmosphere of Rishikesh.
          </p>
        </motion.div>

        <div className="saptah-grid-4">
          {sacred.map((item, i) => (
            <motion.div
              key={i}
              className="saptah-sacred-card"
              style={{ padding: '32px', display: 'flex', flexDirection: 'column', textAlign: 'center', overflow: 'hidden' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
            >
              <div className="saptah-card-inner">
                <div className="saptah-sacred-icon">
                  <item.icon style={{ width: 24, height: 24, color: 'var(--s-gold)' }} />
                </div>
                <h4 style={{ fontFamily: 'var(--s-font-heading)', fontSize: '20px', color: 'var(--s-maroon)', marginBottom: '12px' }}>{item.title}</h4>
                <p style={{ color: 'hsl(20,10%,45%)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px', flex: 1, fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
                <div style={{ width: '100%', height: '1px', background: 'hsla(0,40%,22%,0.1)', marginBottom: '16px' }} />
                <div style={{ fontSize: '24px', color: 'hsla(0,40%,22%,0.4)', textAlign: 'center', fontWeight: 300 }}>{item.sanskrit}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════ GALLERY SECTION ═══════ */
const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const images = [
    { src: '/saptah/hero-gathering.jpg', alt: 'Spiritual Gathering', className: 'saptah-gallery-item-large' },
    { src: '/saptah/temple-sunset.jpg', alt: 'Temple at Sunset', className: '' },
    { src: '/saptah/aarti-ceremony.jpg', alt: 'Aarti Ceremony', className: '' },
    { src: '/saptah/ashram.jpg', alt: 'Beautiful Ashram', className: '' },
    { src: '/saptah/meditation.jpg', alt: 'Riverside Meditation', className: '' },
    { src: '/saptah/rishikesh.jpg', alt: 'Rishikesh Landscape', className: 'saptah-gallery-item-wide' }
  ];

  return (
    <section className="saptah-section-cream" ref={ref} style={{ paddingLeft: '24px', paddingRight: '24px' }}>
      <div className="saptah-container-lg">
        <motion.div style={{ textAlign: 'center', marginBottom: '48px' }} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <p className="saptah-label-gold" style={{ marginBottom: '12px' }}>&#x2726; Visual Journey &#x2726;</p>
          <h2 className="saptah-heading-spiritual" style={{ fontSize: 'clamp(28px, 5vw, 60px)', marginBottom: '16px' }}>A Glimpse of What Awaits</h2>
          <div className="saptah-divider-gold" />
        </motion.div>

        <div className="saptah-gallery-grid">
          {images.map((img, i) => (
            <motion.div key={i} className={`saptah-gallery-item ${img.className}`} initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}>
              <img src={img.src} alt={img.alt} />
              <div className="saptah-gallery-hover-overlay">
                <span className="saptah-gallery-hover-label">{img.alt}</span>
              </div>
              <div className="saptah-gallery-corner-tl" />
              <div className="saptah-gallery-corner-br" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════ CTA SECTION ═══════ */
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="saptah-cta" ref={ref}>
      <div className="saptah-cta-bg">
        <img src="/saptah/temple-sunset.jpg" alt="Sacred gathering" />
        <div className="saptah-cta-bg-overlay1" />
        <div className="saptah-cta-bg-overlay2" />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, hsla(25,45%,25%,0.3), transparent)' }} />
      <span className="saptah-om-bg" style={{ top: '10%', left: '10%', fontSize: '200px', color: 'hsla(25,45%,25%,0.04)' }}>&#x0950;</span>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '768px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div className="saptah-divider-ornate" style={{ maxWidth: '200px', margin: '0 auto 24px' }} initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}} transition={{ duration: 0.8 }}>
          <span style={{ color: '#B97A3D', fontSize: '18px' }}>&#x2619;</span>
        </motion.div>

        <motion.h2 className="saptah-cta-heading" style={{ marginBottom: '32px' }} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          Join Us in Rishikesh, Experience Peace,{' '}
          <span className="saptah-hero-emphasis">Return with Clarity.</span>
        </motion.h2>

        <motion.p className="saptah-cta-intro-light" style={{ marginBottom: '48px' }} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
          We warmly invite you to join Aaziko Global LLP for this sacred Bhagwat Saptah in Rishikesh and be part of a deeply peaceful and spiritually enriching experience.
        </motion.p>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, hsla(25,45%,25%,0.2), transparent)' }} />
    </section>
  );
};

/* ═══════ FOOTER SECTION (Sacred page footer) ═══════ */
const SaptahFooter = () => {
  return (
    <footer className="saptah-footer">
      <div className="saptah-footer-top-line" />
      <div className="saptah-container-lg" style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--s-font-heading)', fontSize: 'clamp(24px, 3vw, 30px)', color: 'rgba(92,64,51,0.8)', fontStyle: 'italic', marginBottom: '16px' }}>
          &#x0950; &#x0936;&#x093E;&#x0928;&#x094D;&#x0924;&#x093F;&#x0903; &#x0936;&#x093E;&#x0928;&#x094D;&#x0924;&#x093F;&#x0903; &#x0936;&#x093E;&#x0928;&#x094D;&#x0924;&#x093F;&#x0903;
        </p>
        <p style={{ color: 'rgba(92,64,51,0.5)', fontFamily: 'var(--s-font-body)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Aaziko Global LLP &middot; Bhagwat Saptah &middot; Rishikesh, Uttarakhand, India
        </p>
        <p style={{ color: 'rgba(92,64,51,0.4)', fontFamily: 'var(--s-font-body)', fontSize: '10px', letterSpacing: '0.05em', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Building trusted global trade relationships with clarity, commitment, and values
        </p>
        <p style={{ color: 'rgba(92,64,51,0.35)', fontFamily: 'var(--s-font-body)', fontSize: '10px', letterSpacing: '0.05em', marginTop: '8px' }}>
          &copy; 2026 Aaziko Global LLP. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

/* ═══════ MAIN SAPTAH PAGE ═══════ */
const Saptah = () => {
  return (
    <>
      <Navbar darkMode={false} />
      <div className="saptah-page">
        <HeroSection />
        <AboutSection />
        <PurposeSection />
        <SpiritualGuideSection />
        <InvitationSection />
        <FamilyExperienceSection />
        <WhyRishikeshSection />
        <ExperienceSacredSection />
        <GallerySection />
        <SaptahFooter />
      </div>
      <Footer hideCTA />
    </>
  );
};

export default Saptah;
