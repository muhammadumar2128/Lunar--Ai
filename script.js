/**
 * Lunar AI — Embedded Diagnostic Assessment & Scoring Engine
 * Strictly Zero Blue Tones. Built for Muhammad Abdullah, Muhammad Bilal & Muhammad Umar.
 */

document.addEventListener('DOMContentLoaded', () => {
  // All 15 Assessment Questions & Logic
  const questionsData = [
    // PART 1: HOW YOUR STORE WORKS TODAY (Q1-Q10, scoring 0, 1, 2)
    {
      part: "Part 1: How Your Store Works Today",
      id: 1,
      title: "How fast does your store load on a phone?",
      subtitle: "Pick the closest answer.",
      type: "single",
      group: "foundation",
      topic: "Speed and design",
      options: [
        { label: "A. I've tested it and it's under 3 seconds", points: 2 },
        { label: "B. I think it's fine, but I've never tested it", points: 1 },
        { label: "C. I know it's slow, or customers have told me", points: 0 }
      ],
      insightTitle: "Speed and design",
      insightText: "A mobile site that loads just 0.1 seconds faster lifted retail conversion by 8.4%, and shoppers spent 9.2% more. Speed is a sales lever, not a tech detail. (Google and Deloitte)"
    },
    {
      part: "Part 1: How Your Store Works Today",
      id: 2,
      title: "When a customer adds something to their cart, what happens?",
      subtitle: "Pick the closest answer.",
      type: "single",
      group: "foundation",
      topic: "Cart Architecture",
      options: [
        { label: "A. A smooth slide-out cart with upsells and clear next steps", points: 2 },
        { label: "B. They go to a standard cart page", points: 1 },
        { label: "C. Not sure, or I know it loses people", points: 0 }
      ],
      insightTitle: "Cart Dropoff Friction",
      insightText: "Redirecting buyers to a clunky default cart page interrupts momentum. An intelligent slide-out cart with relevant upsells preserves focus and increases Average Order Value."
    },
    {
      part: "Part 1: How Your Store Works Today",
      id: 3,
      title: "How closely does your checkout match your brand?",
      subtitle: "Pick the closest answer.",
      type: "single",
      group: "foundation",
      topic: "Recovery",
      options: [
        { label: "A. Fully branded and consistent with the rest of the store", points: 2 },
        { label: "B. Partly branded, mostly default", points: 1 },
        { label: "C. It's the standard Shopify look", points: 0 }
      ],
      insightTitle: "Recovery",
      insightText: "Roughly 70% of online carts are abandoned. Better checkout design alone could lift the average large store's conversion rate by about 35%. Most lost sales aren't lost for good. (Baymard Institute)"
    },
    {
      part: "Part 1: How Your Store Works Today",
      id: 4,
      title: "How well does your product page do the work of a salesperson?",
      subtitle: "Pick the closest answer.",
      type: "single",
      group: "foundation",
      topic: "Product Page Salesmanship",
      options: [
        { label: "A. Strong images, clear details, social proof, and styling suggestions", points: 2 },
        { label: "B. Good images and a description, not much else", points: 1 },
        { label: "C. It's basic, and shoppers often have to ask questions", points: 0 }
      ],
      insightTitle: "PDP Conversion Power",
      insightText: "A luxury product page must proactively eliminate buyer doubts. Missing styling suggestions, fit guidance, and dynamic social proof turn high-intent visitors away."
    },
    {
      part: "Part 1: How Your Store Works Today",
      id: 5,
      title: "When a shopper has a question while browsing, how do they get an answer?",
      subtitle: "Pick the closest answer.",
      type: "single",
      group: "personal_shopper",
      topic: "AI shopping",
      options: [
        { label: "A. An assistant that knows our whole catalog, available any time", points: 2 },
        { label: "B. Email or a contact form, answered within a day", points: 1 },
        { label: "C. They mostly don't ask. They leave", points: 0 }
      ],
      insightTitle: "AI shopping",
      insightText: "71% of consumers expect personalized interactions, and faster-growing companies earn 40% more of their revenue from personalization than slower-growing ones. (McKinsey & Company)"
    },
    {
      part: "Part 1: How Your Store Works Today",
      id: 6,
      title: "How do you help shoppers put together a full look or bundle?",
      subtitle: "Pick the closest answer.",
      type: "single",
      group: "personal_shopper",
      topic: "Curated Bundling",
      options: [
        { label: "A. Curated lookbooks and personalized bundles", points: 2 },
        { label: "B. Occasional 'you may also like' suggestions", points: 1 },
        { label: "C. We don't. Shoppers find things themselves", points: 0 }
      ],
      insightTitle: "Personalized Merchandising",
      insightText: "A shopper who feels known buys more. Curated lookbooks and personalized bundles turn single-item purchases into high-ticket multi-item transactions."
    },
    {
      part: "Part 1: How Your Store Works Today",
      id: 7,
      title: "What happens when a visitor abandons their cart?",
      subtitle: "Pick the closest answer.",
      type: "single",
      group: "concierge",
      topic: "Abandoned Cart Recovery",
      options: [
        { label: "A. Automated, personalized recovery", points: 2 },
        { label: "B. A generic reminder email", points: 1 },
        { label: "C. Nothing", points: 0 }
      ],
      insightTitle: "Automated Cart Recovery",
      insightText: "Generic email blasts are ignored. Targeted, contextual recovery that highlights specific abandoned variants and answers common checkout hesitations recaptures up to 35% of lost revenue."
    },
    {
      part: "Part 1: How Your Store Works Today",
      id: 8,
      title: "How do you treat your best repeat customers?",
      subtitle: "Pick the closest answer.",
      type: "single",
      group: "concierge",
      topic: "VIP Treatment",
      options: [
        { label: "A. They get a dedicated experience, early access, or a private portal", points: 2 },
        { label: "B. A discount code now and then", points: 1 },
        { label: "C. They're treated like every other customer", points: 0 }
      ],
      insightTitle: "VIP Retention & LTV",
      insightText: "Repeat customers represent the highest-margin segment in ecommerce. Treating them like first-time visitors caps your retention revenue and lifetime customer value."
    },
    {
      part: "Part 1: How Your Store Works Today",
      id: 9,
      title: "When a customer needs a human, how smooth is the handoff?",
      subtitle: "Pick the closest answer.",
      type: "single",
      group: "concierge",
      topic: "Contextual Team Handoff",
      options: [
        { label: "A. Instant, with the full conversation passed to our team", points: 2 },
        { label: "B. They have to repeat themselves", points: 1 },
        { label: "C. There's no clear route to a human", points: 0 }
      ],
      insightTitle: "Concierge Handoff",
      insightText: "Making VIP shoppers re-explain their needs causes friction. Instant, contextual AI-to-team handoff converts high-ticket inquiries directly into completed orders."
    },
    {
      part: "Part 1: How Your Store Works Today",
      id: 10,
      title: "Does your store feel as premium as your products?",
      subtitle: "Pick the closest answer.",
      type: "single",
      group: "foundation",
      topic: "Brand Perception & Pricing Power",
      options: [
        { label: "A. Yes, customers regularly say so", points: 2 },
        { label: "B. Somewhat. It feels more 'template' than 'brand'", points: 1 },
        { label: "C. No. The store undersells the product", points: 0 }
      ],
      insightTitle: "Aesthetic Authority",
      insightText: "When an online store feels like an off-the-shelf template, customers resist luxury price points. Bespoke editorial design commands brand authority."
    },

    // PART 2: WHERE YOU ARE VS. WHERE YOU WANT TO BE (Q11, Q12)
    {
      part: "Part 2: Where You Are vs. Where You Want To Be",
      id: 11,
      title: "Which best describes your store right now?",
      subtitle: "Pick the closest answer.",
      type: "single",
      options: [
        { label: "A. Not yet launched or just rebuilt", val: "rebuilt" },
        { label: "B. Getting traffic, but conversion is lower than I'd like", val: "low_cvr" },
        { label: "C. Selling well, but I want a more premium experience", val: "want_premium" },
        { label: "D. Growing fast and the store can't keep up", val: "growing_fast" }
      ]
    },
    {
      part: "Part 2: Where You Are vs. Where You Want To Be",
      id: 12,
      title: "What would your ideal store look like in 6 months?",
      subtitle: "Pick the closest answer.",
      type: "single",
      options: [
        { label: "A. A premium, fast store that converts better", val: "fast_cvr" },
        { label: "B. A store with an AI shopper that helps customers buy", val: "ai_shopper" },
        { label: "C. A full VIP experience that keeps customers coming back", val: "vip_exp" },
        { label: "D. Not sure yet", val: "unsure" }
      ]
    },

    // PART 3: WHAT'S IN THE WAY (Q13, Q14, Q15)
    {
      part: "Part 3: What's In The Way",
      id: 13,
      title: "What has held you back from fixing this?",
      subtitle: "Pick the closest answer.",
      type: "single",
      options: [
        { label: "A. Cost", val: "cost" },
        { label: "B. Not sure what to prioritize", val: "priority" },
        { label: "C. Past agency or freelancer experience went badly", val: "agency_issue" },
        { label: "D. No time to manage a project", val: "no_time" },
        { label: "E. Something else", val: "other" }
      ]
    },
    {
      part: "Part 3: What's In The Way",
      id: 14,
      title: "If we could fix one thing first, which would it be?",
      subtitle: "Pick the closest answer.",
      type: "single",
      options: [
        { label: "A. Design, cart, and checkout", targetPackage: "Foundation" },
        { label: "B. AI shopper and merchandising", targetPackage: "Personal Shopper" },
        { label: "C. VIP experience and customer recovery", targetPackage: "Concierge" },
        { label: "D. I'd want your recommendation", targetPackage: "Recommendation" }
      ]
    },
    {
      part: "Part 3: What's In The Way",
      id: 15,
      title: "Anything else you'd like us to know about your store or your goals?",
      subtitle: "(Open text field)",
      type: "open_text"
    }
  ];

  // Assessment State
  let currentStep = 0;
  const collectedAnswers = {};
  let contactData = { name: '', email: '', store: '' };

  // DOM Elements
  const progressFill = document.getElementById('quiz-progress');
  const partLabel = document.getElementById('quiz-part-label');
  const countLabel = document.getElementById('quiz-count-label');
  const stepBody = document.getElementById('quiz-step-body');
  const questionTitle = document.getElementById('q-title');
  const questionSub = document.getElementById('q-sub');
  const optionsContainer = document.getElementById('q-options');
  const prevBtn = document.getElementById('quiz-prev-btn');

  const leadBody = document.getElementById('quiz-lead-body');
  const leadForm = document.getElementById('audit-lead-form');
  const nameInput = document.getElementById('lead-user-name');
  const emailInput = document.getElementById('lead-user-email');
  const storeInput = document.getElementById('lead-store-url');
  const nameErr = document.getElementById('err-name');
  const emailErr = document.getElementById('err-email');

  const resultsBody = document.getElementById('quiz-results-body');
  const scoreHero = document.getElementById('result-score');
  const scoreBadge = document.getElementById('result-badge');
  const scoreExplanation = document.getElementById('result-explanation');
  const pkgTitle = document.getElementById('result-pkg-title');
  const pkgDesc = document.getElementById('result-pkg-desc');
  const pkgFeatures = document.getElementById('result-pkg-features');
  const insightsFeed = document.getElementById('result-insights-feed');
  const ctaPanel = document.getElementById('result-cta-panel');

  // Render question step
  function renderQuizStep(idx) {
    if (idx >= questionsData.length) {
      showLeadStep();
      return;
    }

    stepBody.classList.remove('hidden');
    leadBody.classList.add('hidden');
    resultsBody.classList.add('hidden');

    const q = questionsData[idx];
    const pct = ((idx + 1) / questionsData.length) * 100;

    progressFill.style.width = `${pct}%`;
    partLabel.textContent = q.part;
    countLabel.textContent = `Question ${idx + 1} of ${questionsData.length}`;
    questionTitle.textContent = q.title;
    questionSub.textContent = q.subtitle;

    if (idx > 0) {
      prevBtn.classList.remove('hidden');
    } else {
      prevBtn.classList.add('hidden');
    }

    optionsContainer.innerHTML = '';

    if (q.type === 'single') {
      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'opt-btn';
        if (collectedAnswers[q.id]?.label === opt.label) {
          btn.classList.add('active');
        }
        btn.textContent = opt.label;

        btn.addEventListener('click', () => {
          collectedAnswers[q.id] = {
            ...opt,
            topic: q.topic || '',
            insightTitle: q.insightTitle || '',
            insightText: q.insightText || ''
          };

          setTimeout(() => {
            currentStep++;
            renderQuizStep(currentStep);
          }, 140);
        });

        optionsContainer.appendChild(btn);
      });
    } else if (q.type === 'open_text') {
      const textarea = document.createElement('textarea');
      textarea.className = 'open-text-input';
      textarea.rows = 4;
      textarea.placeholder = "Enter any notes or goals for your store (optional)...";
      if (collectedAnswers[q.id]?.text) textarea.value = collectedAnswers[q.id].text;

      const continueBtn = document.createElement('button');
      continueBtn.type = 'button';
      continueBtn.className = 'btn-pill btn-pill-accent btn-pill-lg btn-block';
      continueBtn.innerHTML = `<span>Continue to Store Score</span> <span class="btn-arrow">→</span>`;

      continueBtn.addEventListener('click', () => {
        collectedAnswers[q.id] = { text: textarea.value.trim() };
        currentStep++;
        renderQuizStep(currentStep);
      });

      optionsContainer.appendChild(textarea);
      optionsContainer.appendChild(continueBtn);
    }
  }

  // Previous button
  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      renderQuizStep(currentStep);
    }
  });

  // Lead step
  function showLeadStep() {
    stepBody.classList.add('hidden');
    leadBody.classList.remove('hidden');
    resultsBody.classList.add('hidden');
  }

  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasErr = false;
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    nameErr.classList.remove('visible');
    emailErr.classList.remove('visible');

    if (!nameVal) {
      nameErr.classList.add('visible');
      hasErr = true;
    }
    if (!emailVal || !emailPattern.test(emailVal)) {
      emailErr.classList.add('visible');
      hasErr = true;
    }

    if (hasErr) return;

    contactData = {
      name: nameVal,
      email: emailVal,
      store: storeInput.value.trim()
    };

    renderDiagnosticResults();
  });

  // SCORING ENGINE
  function renderDiagnosticResults() {
    leadBody.classList.add('hidden');
    resultsBody.classList.remove('hidden');

    // 1. Q1-10 Raw score (0-20), divide by 2 for /10 Store Health Score
    let rawScore = 0;
    const scoredGaps = [];

    for (let i = 1; i <= 10; i++) {
      const ans = collectedAnswers[i];
      const pts = ans ? (ans.points ?? 0) : 0;
      const gap = 2 - pts; // 0 = no friction (good), 1 = moderate, 2 = severe bottleneck
      rawScore += pts;
      scoredGaps.push({
        id: i,
        points: pts,
        gap: gap,
        topic: questionsData[i - 1].topic,
        title: questionsData[i - 1].insightTitle,
        text: questionsData[i - 1].insightText
      });
    }

    const calculatedScore = (rawScore / 2).toFixed(1);
    const scoreVal = parseFloat(calculatedScore);

    scoreHero.textContent = calculatedScore;

    // Cutoff: 7.5/10 and above = Good store (Health Score 8-10) -> PDF Audit
    // Below 7.5/10 = Needs improvement -> Packages and Founder Strategy Call
    const isGoodStore = scoreVal >= 7.5;

    if (isGoodStore) {
      scoreBadge.textContent = "High-Performance Foundation (Qualified for Strategy Call)";
      scoreBadge.style.color = "#34d399";
      scoreBadge.style.borderColor = "rgba(52, 211, 153, 0.4)";
      scoreExplanation.textContent = `Your store demonstrates solid fundamentals with a health rating of ${calculatedScore}/10. You qualify for an exclusive 1-on-1 strategy session directly with the founders to unlock high-margin micro-optimizations.`;
    } else {
      scoreBadge.textContent = "Revenue Growth Opportunity (Needs Optimization)";
      scoreBadge.style.color = "#fbbf24";
      scoreBadge.style.borderColor = "rgba(251, 191, 36, 0.4)";
      scoreExplanation.textContent = `With a health rating of ${calculatedScore}/10, your store is currently leaking qualified shoppers across checkout, mobile UX, and merchandising. Your comprehensive Store Audit & Fix Guide PDF has been generated below.`;
    }

    // 2. Package Recommendation (Q14 & Q1-10 gap pattern)
    const q14 = collectedAnswers[14];
    let recommendedPackageKey = "";

    if (q14 && q14.targetPackage && q14.targetPackage !== "Recommendation") {
      recommendedPackageKey = q14.targetPackage;
    } else {
      const getGap = (id) => 2 - (collectedAnswers[id]?.points ?? 2);
      const foundationGap = getGap(1) + getGap(2) + getGap(3) + getGap(4) + getGap(10);
      const personalShopperGap = (getGap(5) + getGap(6)) * 2;
      const conciergeGap = (getGap(7) + getGap(8) + getGap(9)) * 1.33;

      if (personalShopperGap >= foundationGap && personalShopperGap >= conciergeGap) {
        recommendedPackageKey = "Personal Shopper";
      } else if (conciergeGap >= foundationGap && conciergeGap >= personalShopperGap) {
        recommendedPackageKey = "Concierge";
      } else {
        recommendedPackageKey = "Foundation";
      }
    }

    const packageData = {
      "Foundation": {
        name: "Lunar Foundation",
        desc: "Design, cart, and checkout architecture engineered to eliminate bounce and maximize completed transactions.",
        specs: [
          "Sub-0.2s mobile page speed architecture",
          "Slide-out cart with contextual upsells",
          "Fully branded, conversion-optimized checkout"
        ]
      },
      "Personal Shopper": {
        name: "Lunar Personal Shopper",
        desc: "Autonomous AI shopper and merchandising engine that knows your entire catalog and guides shoppers in real time.",
        specs: [
          "24/7 autonomous catalog assistant",
          "Personalized bundling and lookbooks",
          "Context-aware product recommendations"
        ]
      },
      "Concierge": {
        name: "Lunar Concierge",
        desc: "VIP customer experience and automated cart recovery to maximize customer lifetime value.",
        specs: [
          "Automated, personalized cart recovery",
          "Private portal and VIP tiering for repeat buyers",
          "Instant AI-to-team handoff with complete context"
        ]
      }
    };

    const pkg = packageData[recommendedPackageKey] || packageData["Foundation"];
    pkgTitle.textContent = pkg.name;
    pkgDesc.textContent = pkg.desc;
    pkgFeatures.innerHTML = pkg.specs.map(item => `<li>${item}</li>`).join('');

    // 3. Three Insights pulled from three questions with largest gap (bottlenecks)
    const sortedGaps = [...scoredGaps].sort((a, b) => b.gap - a.gap);
    const topThree = sortedGaps.slice(0, 3);

    insightsFeed.innerHTML = topThree.map(item => `
      <div class="gap-feed-item">
        <strong>${item.title} (${item.topic})</strong>
        <p>${item.text}</p>
      </div>
    `).join('');

    // 4. Call to Action based on cutoff
    // High Score (>= 7.5): Qualifies for Founder Strategy Call (Calendly)
    // Low Score (< 7.5): Receives the Store Audit & Fix Guide PDF
    if (isGoodStore) {
      ctaPanel.innerHTML = `
        <a href="https://calendly.com/lunarai" target="_blank" rel="noopener noreferrer" class="btn-pill btn-pill-accent btn-pill-lg btn-block" id="btn-book-call">
          <span>Book a Strategy Call with the Founders (${pkg.name})</span>
          <span class="btn-arrow">→</span>
        </a>
        <div class="btn-pill btn-pill-outline btn-block" style="margin-top: 10px; text-align: center; font-size: 13px;" id="btn-pdf-status">
          Founder Strategy Call (Calendly) link dispatched via email to ${contactData.email}
        </div>
      `;
    } else {
      ctaPanel.innerHTML = `
        <a href="https://lunarai.agency/assets/lunar-store-audit.pdf" download class="btn-pill btn-pill-accent btn-pill-lg btn-block" id="btn-download-audit-pdf">
          <span>Download 15-Point Store Audit PDF</span>
          <span class="btn-arrow">↓</span>
        </a>
        <div class="btn-pill btn-pill-outline btn-block" style="margin-top: 10px; text-align: center; font-size: 13px;" id="btn-pdf-status">
          Full Store Audit & Fix Guide (PDF) dispatched via email to ${contactData.email}
        </div>
      `;
    }

    // 5. Send Transactional Email via Resend API
    fetch('/api/send-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: contactData.name,
        email: contactData.email,
        store: contactData.store,
        score: calculatedScore,
        isGoodStore: isGoodStore,
        recommendedPackage: pkg.name,
        packageDesc: pkg.desc,
        packageSpecs: pkg.specs,
        topBottlenecks: topThree.map(item => ({
          title: item.title,
          topic: item.topic,
          text: item.text
        })),
        revenue: collectedAnswers[11]?.label || 'Not specified',
        obstacle: collectedAnswers[12]?.label || 'Not specified',
        timeline: collectedAnswers[13]?.label || 'Immediately'
      })
    })
    .then(res => res.json())
    .then(result => {
      const statusEl = document.getElementById('btn-pdf-status');
      if (statusEl && result.success) {
        statusEl.textContent = `✓ Report successfully delivered to ${contactData.email}`;
      }
    })
    .catch(err => {
      console.warn('Email dispatch status:', err);
    });

    document.getElementById('interactive-audit')?.scrollIntoView({ behavior: 'smooth' });
  }

  // Initialize Quiz
  renderQuizStep(0);

  // =========================================================================
  // HERO 2.5D FANNED CARDS SHOWCASE INTERACTION
  // =========================================================================
  const heroDeck = document.getElementById('hero-deck');
  if (heroDeck) {
    // Sort cards by data-index (0..4) for deterministic circular math
    const cards = Array.from(heroDeck.querySelectorAll('.fanned-card')).sort((a, b) => {
      return parseInt(a.getAttribute('data-index'), 10) - parseInt(b.getAttribute('data-index'), 10);
    });
    const dots = Array.from(heroDeck.querySelectorAll('.deck-dot'));
    const posClasses = ['card-pos-1', 'card-pos-2', 'card-pos-3', 'card-pos-4', 'card-pos-5'];
    let activeCenterIndex = 0; // CozyFits Apparel starts as center (index 0)

    function updateDeckPositions(centerIdx) {
      activeCenterIndex = centerIdx;
      const total = cards.length;

      // Assign position classes relative to centerIdx: [-2, -1, 0, +1, +2]
      cards.forEach((card, idx) => {
        let offset = idx - centerIdx;
        // Wrap around circular distance
        if (offset > 2) offset -= total;
        if (offset < -2) offset += total;

        const mappedPosIndex = offset + 2; // mapped to 0..4
        const targetClass = posClasses[mappedPosIndex] || 'card-pos-3';

        // Remove old pos classes and add new
        posClasses.forEach(c => card.classList.remove(c));
        card.classList.add(targetClass);

        if (mappedPosIndex === 2) {
          card.classList.add('card-featured-center');
        } else {
          card.classList.remove('card-featured-center');
        }
      });

      // Update dot active state
      dots.forEach((dot) => {
        const target = parseInt(dot.getAttribute('data-target'), 10);
        dot.classList.toggle('active', target === centerIdx);
      });
    }

    // Direct hover and click listeners on all cards
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('is-hovered');
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('is-hovered');
      });

      card.addEventListener('click', () => {
        const clickedIdx = parseInt(card.getAttribute('data-index'), 10);
        if (!isNaN(clickedIdx) && clickedIdx !== activeCenterIndex) {
          updateDeckPositions(clickedIdx);
        }
      });
    });

    // Dot click event
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const targetIdx = parseInt(dot.getAttribute('data-target'), 10);
        if (!isNaN(targetIdx)) {
          updateDeckPositions(targetIdx);
        }
      });
    });

    // Navigation helper functions
    function nextSlide() {
      const nextIdx = (activeCenterIndex + 1) % cards.length;
      updateDeckPositions(nextIdx);
    }

    function prevSlide() {
      const prevIdx = (activeCenterIndex - 1 + cards.length) % cards.length;
      updateDeckPositions(prevIdx);
    }

    // Arrow navigation buttons
    const prevBtn = heroDeck.querySelector('.deck-nav-prev');
    const nextBtn = heroDeck.querySelector('.deck-nav-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
      });
    }

    // Keyboard navigation (ArrowLeft & ArrowRight)
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      const rect = heroDeck.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });

    // Touch swipe gesture support for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    heroDeck.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    heroDeck.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
          if (deltaX < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      }
    }, { passive: true });
  }

  // =========================================================================
  // THREE BENEFITS INTERACTIVE CARDS (Single Accordion Expansion)
  // =========================================================================
  const benefitCards = document.querySelectorAll('.benefit-ref-card');
  benefitCards.forEach(card => {
    card.addEventListener('click', () => {
      const isAlreadyExpanded = card.classList.contains('expanded');

      // Close all cards in the section
      benefitCards.forEach(otherCard => {
        otherCard.classList.remove('expanded');
      });

      // Expand clicked card only if it was not already open
      if (!isAlreadyExpanded) {
        card.classList.add('expanded');
      }
    });

    // Prevent clicking/selecting text inside the expanded drawer from closing the card
    const drawer = card.querySelector('.benefit-expand-drawer');
    if (drawer) {
      drawer.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });
});


