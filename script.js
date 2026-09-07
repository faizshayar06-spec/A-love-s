document.addEventListener("DOMContentLoaded", () => {

  // ==========================================================
  // 1. FLOATING GOLDEN BUBBLES WITH "Ahmed weds Sahana"
  // ==========================================================
  const bubbleCanvas = document.getElementById("ambientBubbleCanvas");
  const bCtx = bubbleCanvas.getContext("2d");

  let w = (bubbleCanvas.width = window.innerWidth);
  let h = (bubbleCanvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = bubbleCanvas.width = window.innerWidth;
    h = bubbleCanvas.height = window.innerHeight;
  });

  // Bubble entity collection
  const orbs = [];
  const orbCount = 24; // Balanced count for optimal mobile performance

  class GlowingOrb {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * w;
      this.y = initial ? Math.random() * h : h + Math.random() * 80;
      this.radius = 16 + Math.random() * 26; // Bubble size
      this.speedY = 0.4 + Math.random() * 0.7; // Gentle upward drift
      this.swingAmp = 0.5 + Math.random() * 0.8;
      this.swingStep = Math.random() * Math.PI * 2;
      this.alpha = 0.25 + Math.random() * 0.45;
      
      // Assign custom romantic typography inside bubbles
      const textTypes = [
        "Ahmed weds Sahana",
        "A ♡ S",
        "Ahmed weds Sahana",
        "✦ Barakah ✦",
        "A ♡ S"
      ];
      this.text = textTypes[Math.floor(Math.random() * textTypes.length)];
      this.hasText = Math.random() > 0.35; // 65% of bubbles carry names
    }

    update() {
      this.y -= this.speedY;
      this.swingStep += 0.02;
      this.x += Math.sin(this.swingStep) * this.swingAmp;

      if (this.y < -60) {
        this.reset();
      }
    }

    draw() {
      bCtx.save();
      bCtx.globalAlpha = this.alpha;

      // Outer Golden Aura Glow
      const glowGrad = bCtx.createRadialGradient(
        this.x, this.y, this.radius * 0.2,
        this.x, this.y, this.radius
      );
      glowGrad.addColorStop(0, "rgba(255, 245, 205, 0.85)");
      glowGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.45)");
      glowGrad.addColorStop(1, "rgba(212, 175, 55, 0)");

      bCtx.fillStyle = glowGrad;
      bCtx.beginPath();
      bCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      bCtx.fill();

      // Delicate Ring Outline
      bCtx.strokeStyle = "rgba(255, 235, 170, 0.6)";
      bCtx.lineWidth = 1;
      bCtx.beginPath();
      bCtx.arc(this.x, this.y, this.radius * 0.85, 0, Math.PI * 2);
      bCtx.stroke();

      // Shimmering Script Text inside the bubble
      if (this.hasText) {
        bCtx.fillStyle = "#6B4912";
        bCtx.font = "italic 600 9px 'Cormorant Garamond', serif";
        bCtx.textAlign = "center";
        bCtx.textBaseline = "middle";
        bCtx.shadowColor = "rgba(255, 235, 150, 0.9)";
        bCtx.shadowBlur = 4;
        bCtx.fillText(this.text, this.x, this.y);
      }

      bCtx.restore();
    }
  }

  for (let i = 0; i < orbCount; i++) {
    orbs.push(new GlowingOrb());
  }

  function loopOrbs() {
    bCtx.clearRect(0, 0, w, h);
    for (let orb of orbs) {
      orb.update();
      orb.draw();
    }
    requestAnimationFrame(loopOrbs);
  }
  loopOrbs();

  // ==========================================================
  // 2. ENVELOPE OPENING WITH BURST CANVAS & SURROUNDING MOTIFS
  // ==========================================================
  const waxSealTrigger = document.getElementById("waxSealTrigger");
  const envTopFlap = document.getElementById("envTopFlap");
  const energyCore = document.getElementById("energyCore");
  const envelopeOverlay = document.getElementById("envelope-overlay");
  const burstCanvas = document.getElementById("burstCanvas");
  const audioPlayer = document.getElementById("weddingAudio");

  const burstCtx = burstCanvas.getContext("2d");
  burstCanvas.width = window.innerWidth;
  burstCanvas.height = window.innerHeight;

  let burstParticles = [];

  class SparkParticle {
    constructor(startX, startY) {
      this.x = startX;
      this.y = startY;
      const angle = Math.random() * Math.PI * 2;
      const velocity = 3 + Math.random() * 9;
      this.vx = Math.cos(angle) * velocity;
      this.vy = Math.sin(angle) * velocity;
      this.size = 2 + Math.random() * 4;
      this.alpha = 1;
      this.decay = 0.012 + Math.random() * 0.018;
      this.color = ["#FFF8DB", "#FFD700", "#E4C568", "#FFFFFF"][Math.floor(Math.random() * 4)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.96;
      this.vy *= 0.96;
      this.alpha -= this.decay;
    }
    draw() {
      burstCtx.save();
      burstCtx.globalAlpha = Math.max(0, this.alpha);
      burstCtx.fillStyle = this.color;
      burstCtx.shadowColor = "#FFD700";
      burstCtx.shadowBlur = 8;
      burstCtx.beginPath();
      burstCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      burstCtx.fill();
      burstCtx.restore();
    }
  }

  function triggerParticleExplosion(originX, originY) {
    for (let i = 0; i < 90; i++) {
      burstParticles.push(new SparkParticle(originX, originY));
    }
    animateBurst();
  }

  function animateBurst() {
    burstCtx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const p = burstParticles[i];
      p.update();
      p.draw();
      if (p.alpha <= 0) {
        burstParticles.splice(i, 1);
      }
    }
    if (burstParticles.length > 0) {
      requestAnimationFrame(animateBurst);
    }
  }

  if (waxSealTrigger) {
    waxSealTrigger.addEventListener("click", (e) => {
      // Audio playback attempt
      if (audioPlayer) {
        audioPlayer.play().catch(() => {});
      }

      const rect = waxSealTrigger.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      // Phase 1: Explode sparkling particles from seal
      triggerParticleExplosion(originX, originY);

      // Phase 2: Disperse surrounding corner motifs with light
      const motifs = document.querySelectorAll(".motif-corner");
      motifs.forEach((m, idx) => {
        m.style.transform = `scale(2.5) translate(${idx % 2 === 0 ? '-100px' : '100px'}, ${idx < 2 ? '-100px' : '100px'})`;
        m.style.opacity = "0";
      });

      // Phase 3: Golden Energy Core expansion
      if (energyCore) energyCore.classList.add("active");

      // Phase 4: Wax Seal pop out
      waxSealTrigger.style.transform = "translate(-50%, -160%) scale(0.4)";
      waxSealTrigger.style.opacity = "0";

      // Phase 5: Top Flap unrolls
      setTimeout(() => {
        if (envTopFlap) envTopFlap.classList.add("open-unfold");
      }, 200);

      // Phase 6: Fade out envelope screen and reveal main card
      setTimeout(() => {
        if (envelopeOverlay) envelopeOverlay.classList.add("open-dismiss");
      }, 1000);
    });
  }

  // ==========================================================
  // 3. HTML5 SCRATCH CARDS FUNCTIONALITY (DAY, MONTH, YEAR)
  // ==========================================================
  function setupScratchPad(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    const pw = parent.offsetWidth;
    const ph = parent.offsetHeight;
    canvas.width = pw;
    canvas.height = ph;

    // Metallic royal gold foil gradient
    const foil = ctx.createLinearGradient(0, 0, pw, ph);
    foil.addColorStop(0, "#D9BD7E");
    foil.addColorStop(0.3, "#FFF1CF");
    foil.addColorStop(0.65, "#C9A149");
    foil.addColorStop(1, "#8A6420");
    ctx.fillStyle = foil;
    ctx.fillRect(0, 0, pw, ph);

    // Diagonal gold hatched pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1.5;
    for (let x = -pw; x < pw * 2; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + ph, ph);
      ctx.stroke();
    }

    let isScratching = false;

    function scratch(clientX, clientY) {
      const bRect = canvas.getBoundingClientRect();
      const x = clientX - bRect.left;
      const y = clientY - bRect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 17, 0, Math.PI * 2);
      ctx.fill();
    }

    // Mouse Events
    canvas.addEventListener("mousedown", (e) => {
      isScratching = true;
      scratch(e.clientX, e.clientY);
    });
    window.addEventListener("mouseup", () => (isScratching = false));
    canvas.addEventListener("mousemove", (e) => {
      if (isScratching) scratch(e.clientX, e.clientY);
    });

    // Touch Events for Mobile
    canvas.addEventListener("touchstart", (e) => {
      isScratching = true;
      const t = e.touches[0];
      scratch(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener("touchend", () => (isScratching = false));
    canvas.addEventListener("touchmove", (e) => {
      if (isScratching) {
        const t = e.touches[0];
        scratch(t.clientX, t.clientY);
      }
    }, { passive: true });
  }

  setupScratchPad("scratchDay");
  setupScratchPad("scratchMonth");
  setupScratchPad("scratchYear");

  // ==========================================================
  // 4. COUNTDOWN TIMER (Target: 10 January 2027)
  // ==========================================================
  const ceremonyTime = new Date("January 10, 2027 18:00:00").getTime();

  function updateRoyalCountdown() {
    const rightNow = new Date().getTime();
    const span = ceremonyTime - rightNow;

    if (span > 0) {
      const days = Math.floor(span / (1000 * 60 * 60 * 24));
      const hours = Math.floor((span % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((span % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((span % (1000 * 60)) / 1000);

      const dElem = document.getElementById("daysVal");
      const hElem = document.getElementById("hoursVal");
      const mElem = document.getElementById("minsVal");
      const sElem = document.getElementById("secsVal");

      if (dElem) dElem.innerText = String(days).padStart(2, "0");
      if (hElem) hElem.innerText = String(hours).padStart(2, "0");
      if (mElem) mElem.innerText = String(mins).padStart(2, "0");
      if (sElem) sElem.innerText = String(secs).padStart(2, "0");
    }
  }

  setInterval(updateRoyalCountdown, 1000);
  updateRoyalCountdown();
});

