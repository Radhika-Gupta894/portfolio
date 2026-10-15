/**
 * Radhika Gupta - Personal Portfolio JavaScript
 * Features: Custom Cursor, Interactive Particle/Robotics Canvas, Typewriter,
 * 3D Card Tilt, Stat Counters, Skills Filtering, Project Modals, Theme Switch, Contact Handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCustomCursor();
  initScrollProgress();
  initNavbar();
  initHeroCanvas();
  initTypewriter();
  initScrollReveals();
  initStatCounters();
  initSkillsFilter();
  init3DTilt();
  initProjectModals();
  initContactForm();
  initCopyButtons();
});

/* ==========================================================================
   1. Theme Management (Light / Dark)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('radhika-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
  } else {
    document.documentElement.removeAttribute('data-theme');
    updateThemeIcon(false);
  }
  localStorage.setItem('radhika-theme', theme);
}

function updateThemeIcon(isDark) {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;
  themeToggleBtn.innerHTML = isDark
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

/* ==========================================================================
   2. Interactive Custom Cursor
   ========================================================================== */
function initCustomCursor() {
  const cursorDot = document.getElementById('custom-cursor');
  const cursorFollower = document.getElementById('custom-cursor-follower');

  if (!cursorDot || !cursorFollower || window.innerWidth < 992) return;

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.16;
    followerY += (mouseY - followerY) * 0.16;
    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;
    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  const hoverTargets = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-pill, .stat-card, .achievement-card');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorFollower.style.opacity = '1';
  });
}

/* ==========================================================================
   3. Scroll Progress Bar & Navbar Scrollspy
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scrollspy
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   4. Interactive Canvas (Robotics & Neural Constellation Network)
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 120 };

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    createParticles();
  }

  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1.2;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.color = Math.random() > 0.4 ? 'rgba(232, 160, 191, 0.7)' : 'rgba(201, 98, 135, 0.6)';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion/interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = (dx / distance) * force * 3;
          const directionY = (dy / distance) * force * 3;
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((width * height) / 14000);
    for (let i = 0; i < Math.min(count, 65); i++) {
      particles.push(new Particle());
    }
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          const opacity = (1 - distance / 110) * 0.25;
          ctx.strokeStyle = `rgba(232, 160, 191, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   5. Dynamic Typewriter Headline
   ========================================================================== */
function initTypewriter() {
  const typewriterElem = document.getElementById('typewriter-text');
  if (!typewriterElem) return;

  const phrases = [
    "B.Tech Automation & Robotics Engineer",
    "AI/ML & Full-Stack Enthusiast",
    "Agentic AI & GenAI Explorer",
    "Multimodal Biometrics Builder"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElem.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typewriterElem.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 600);
}

/* ==========================================================================
   6. Scroll Reveals (Intersection Observer)
   ========================================================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   7. Animated Stat Counters
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-count');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach((el) => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10) || 0;
  const duration = 1800;
  const stepTime = 25;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.ceil(current);
    }
  }, stepTime);
}

/* ==========================================================================
   8. Skills Category Filtering
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   9. 3D Tilt Effect on Project Cards
   ========================================================================== */
function init3DTilt() {
  const tiltCards = document.querySelectorAll('.project-card, .hero-visual-card');

  if (window.innerWidth < 992) return;

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   10. Interactive Project Details Modal
   ========================================================================== */
const projectData = {
  snapclass: {
    title: "SnapClass AI — Multimodal Biometric Attendance System",
    category: "Computer Vision & Audio ML",
    image: "assets/images/snapclass-ai.jpg",
    tags: ["Python", "Computer Vision", "Dlib", "Resemblyzer", "Librosa", "Scikit-learn", "Supabase", "Streamlit"],
    description: "SnapClass AI revolutionizes classroom accountability by pairing real-time multi-face computer vision with acoustic speaker verification to completely eliminate proxy attendance.",
    features: [
      "Simultaneous multi-face recognition leveraging Dlib 128-dimensional biometric embeddings paired with an optimized Linear SVM classifier.",
      "Acoustic speaker verification engine powered by Resemblyzer and Librosa extracting mel-spectrogram voiceprints evaluated via cosine similarity.",
      "Cloud architecture backed by Supabase PostgreSQL with optimized JSONB vector embedding storage for low-latency retrieval.",
      "Optimized Streamlit client dashboard with session state caching, live webcam and microphone feeds, and instant attendance analytics export."
    ],
    githubUrl: "https://github.com/Radhika-Gupta894",
    demoNote: "Interactive Streamlit prototype with live multi-face bounding boxes and audio spectrogram verification."
  },
  multiagent: {
    title: "Multi-Agent Autonomous Research & Fact-Checking System",
    category: "Agentic AI & LLMs",
    image: "assets/images/multi-agent-system.jpg",
    tags: ["Python", "LangChain", "Google Gemini", "Tavily API", "BeautifulSoup", "Streamlit"],
    description: "An autonomous multi-agent pipeline designed to perform end-to-end research, web scraping, multi-source synthesis, and strict adversarial fact-checking with cited reports.",
    features: [
      "Modular 4-Stage Agent Architecture: Search Agent queries verified web sources, Reader Agent extracts and sanitizes DOM data, Writer Agent synthesizes comprehensive reports, and Critic Agent performs adversarial fact-checking.",
      "Integrated Tavily Search API with BeautifulSoup HTML fallback parsing for rich context retrieval across peer-reviewed and reputable news portals.",
      "Harnesses Google Gemini via LangChain for nuanced semantic reasoning, cross-citation validation, and hallucination suppression.",
      "Enterprise-grade error handling with exponential backoff retry logic, fallback web caches, and live-streaming Streamlit execution dashboard."
    ],
    githubUrl: "https://github.com/Radhika-Gupta894",
    demoNote: "Live research engine generating downloadable Markdown and PDF synthesized research briefs with verification score meters."
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-dynamic-body');
  const viewDetailBtns = document.querySelectorAll('.btn-view-project-details');

  if (!modalOverlay || !modalCloseBtn || !modalBody) return;

  viewDetailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (data) {
        modalBody.innerHTML = `
          <div class="modal-project-header">
            <span class="section-eyebrow" style="margin-bottom: 0.5rem;">${data.category}</span>
            <h2 style="font-size: 1.85rem; color: var(--text-primary); margin-bottom: 1rem; line-height: 1.25;">${data.title}</h2>
          </div>
          <div style="border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-subtle); max-height: 320px;">
            <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            ${data.tags.map(t => `<span class="tech-tag" style="background: var(--badge-bg); color: var(--cta-pink); border-color: var(--border-accent);">${t}</span>`).join('')}
          </div>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
            ${data.description}
          </p>
          <h4 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 0.75rem;">Key Architecture & Highlights:</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
            ${data.features.map(f => `
              <li style="position: relative; padding-left: 1.5rem; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
                <span style="position: absolute; left: 0; color: var(--cta-pink); font-weight: bold;">✦</span>
                ${f}
              </li>
            `).join('')}
          </ul>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-solid">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              View on GitHub
            </a>
            <span style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">${data.demoNote}</span>
          </div>
        `;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   11. Contact Form Handling & Interactive Toast
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('portfolio-contact-form');
  const submitBtn = document.getElementById('btn-submit-contact');

  if (!contactForm || !submitBtn) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.", "warning");
      return;
    }

    // Button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle><path d="M4 12a8 8 0 0 1 8-8"></path></svg>
      Sending Message...
    `;
    submitBtn.disabled = true;

    // Simulate reliable dispatch
    setTimeout(() => {
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Message Sent!
      `;
      submitBtn.style.background = '#10B981';

      showToast("Thank you, " + name + "! Your message has been sent to Radhika.", "success");
      contactForm.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3500);
    }, 1200);
  });
}

function showToast(message, type = "info") {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  const iconSvg = type === "success"
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    <div class="toast-icon" style="${type === 'success' ? 'background: #10B981;' : ''}">
      ${iconSvg}
    </div>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   12. Copy to Clipboard for Email & Phone
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy-channel');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = 'var(--cta-pink)';
        btn.style.color = '#fff';
        btn.style.borderColor = 'var(--cta-pink)';

        showToast(`Copied "${textToCopy}" to clipboard!`, 'success');

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      }).catch(() => {
        showToast("Failed to copy. Please select manually.", "warning");
      });
    });
  });
}

// Add simple spinning animation style for spinner icon
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);
