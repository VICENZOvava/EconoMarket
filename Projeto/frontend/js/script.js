gsap.registerPlugin(ScrollTrigger);

// ============================================================
// INITIAL STATES + APPLY DATA-ROT
// ============================================================
gsap.set("#nav", { opacity: 0, y: -20 });
gsap.set(".small-team .word > span", { y: "105%" });
gsap.set(".big-results .letter", { y: 80, opacity: 0 });
gsap.set("#subline", { opacity: 0, y: 20 });
gsap.set(".t-card", { opacity: 0 });
gsap.set(".stats-inner", { opacity: 0 });

// Apply each card's natural rotation as the rest-state, but start them off-screen above + rotated
document.querySelectorAll(".card").forEach((card) => {
  const rot = parseFloat(card.dataset.rot) || 0;
  card.dataset.restRot = rot;
  gsap.set(card, { y: -800, rotation: rot + 25, opacity: 0, scale: 0.7 });
});

// ============================================================
// INTRO TIMELINE
// ============================================================
const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
intro
  .to("#nav", { opacity: 1, y: 0, duration: 0.8 }, 0.1)
  .to(
    ".small-team .word > span",
    {
      y: "0%",
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out"
    },
    0.3
  )
  .to(
    ".big-results .letter",
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.05,
      ease: "back.out(1.6)"
    },
    0.55
  )
  .to(
    ".card",
    {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: (i, el) => parseFloat(el.dataset.restRot) || 0,
      duration: 1.1,
      stagger: { each: 0.08, from: "center" },
      ease: "back.out(1.4)"
    },
    0.8
  )
  .to("#subline", { opacity: 1, y: 0, duration: 0.8 }, 1.6);

// ============================================================
// CONTINUOUS FLOAT ON CARDS
// ============================================================
document.querySelectorAll(".card").forEach((card, i) => {
  const rot = parseFloat(card.dataset.restRot) || 0;
  gsap.to(card, {
    y: `+=${8 + (i % 3) * 5}`,
    rotation: rot + (i % 2 === 0 ? 1.5 : -1.5),
    duration: 3 + (i % 4) * 0.5,
    delay: 1.8 + i * 0.1,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });
});

// ============================================================
// MOUSE PARALLAX ON CARDS
// ============================================================
const hero = document.querySelector(".hero");
let mx = 0,
  my = 0,
  tx = 0,
  ty = 0;
hero.addEventListener("mousemove", (e) => {
  const r = hero.getBoundingClientRect();
  mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
  my = ((e.clientY - r.top) / r.height - 0.5) * 2;
});
hero.addEventListener("mouseleave", () => {
  mx = 0;
  my = 0;
});

function parallax() {
  tx += (mx - tx) * 0.05;
  ty += (my - ty) * 0.05;
  document.querySelectorAll(".card").forEach((card) => {
    const d = parseFloat(card.dataset.depth) || 8;
    card.style.translate = `${tx * d}px ${ty * d * 0.5}px`;
  });
  requestAnimationFrame(parallax);
}
parallax();

// ============================================================
// CARD HOVER 3D LIFT
// ============================================================
document.querySelectorAll(".card").forEach((card) => {
  const restRot = parseFloat(card.dataset.restRot) || 0;
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateX: -py * 16,
      rotateY: px * 16,
      scale: 1.12,
      zIndex: 20,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 700,
      overwrite: "auto"
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      zIndex: card.style.zIndex || "",
      duration: 0.8,
      ease: "elastic.out(1, 0.6)",
      overwrite: "auto"
    });
  });
  card.addEventListener("click", () => {
    gsap.fromTo(
      card,
      { scale: 1.15 },
      {
        scale: 1.05,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }
    );
  });
});

// ============================================================
// SCROLL: CARDS FAN OUT, "big results" SCALES UP
// ============================================================
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  scrub: 0.8,
  onUpdate: (self) => {
    const p = self.progress;
    // Big results scales up and stays gray
    gsap.set(".big-results", { scale: 1 + 0.15 * p, opacity: 1 - 0.4 * p });
    // Small team rises out
    gsap.set(".small-team", { y: -60 * p, opacity: 1 - p * 1.5 });
    // Cards: outer cards fly further out, center cards drift up more
    const moves = [
      { x: -260, y: -40, rot: -25 }, // 1
      { x: -200, y: 20, rot: -18 }, // 2
      { x: -120, y: 80, rot: -10 }, // 3
      { x: -40, y: 120, rot: -4 }, // 4
      { x: 40, y: 120, rot: 4 }, // 5
      { x: 120, y: 80, rot: 12 }, // 6
      { x: 200, y: 20, rot: 22 }, // 7
      { x: 260, y: -40, rot: 28 } // 8
    ];
    document.querySelectorAll(".card").forEach((card, i) => {
      const m = moves[i];
      const rest = parseFloat(card.dataset.restRot) || 0;
      gsap.set(card, {
        x: m.x * p,
        y: m.y * p,
        rotation: rest + m.rot * p
      });
    });
    gsap.set("#subline", { opacity: 1 - p * 2 });
  }
});

// ============================================================
// TEAM GRID REVEAL ON SCROLL
// ============================================================
gsap.from(".eyebrow, .team-head h2, .team-head p", {
  opacity: 0,
  y: 30,
  duration: 0.9,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".team-head", start: "top 80%" }
});

gsap.to(".t-card", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.08,
  ease: "power3.out",
  scrollTrigger: { trigger: ".team-grid", start: "top 80%" }
});
gsap.from(".t-card", {
  y: 80,
  scale: 0.9,
  rotation: (i) => (i % 2 === 0 ? -3 : 3),
  duration: 1,
  stagger: 0.08,
  ease: "back.out(1.3)",
  scrollTrigger: { trigger: ".team-grid", start: "top 80%" }
});

// ============================================================
// STATS REVEAL + COUNTERS
// ============================================================
gsap.to(".stats-inner", {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: { trigger: ".stats", start: "top 80%" }
});
gsap.from(".stats-inner", {
  y: 60,
  scale: 0.97,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: { trigger: ".stats", start: "top 80%" }
});

ScrollTrigger.create({
  trigger: ".stats",
  start: "top 75%",
  onEnter: () => {
    document.querySelectorAll(".stat-block .num").forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const span = el.querySelector("span");
      gsap.to(
        { v: 0 },
        {
          v: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            span.textContent = Math.floor(this.targets()[0].v).toLocaleString();
          }
        }
      );
    });
  },
  once: true
});

// ============================================================
// CTA / BUTTON CLICKS
// ============================================================
document.querySelectorAll(".nav-cta, .arrow-pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    gsap.fromTo(
      btn,
      { scale: 1 },
      {
        scale: 0.93,
        duration: 0.12,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }
    );
  });
});

// Big results: subtle letter rise on hover of the wrap
document
  .querySelector(".big-results-wrap")
  .addEventListener("mouseenter", () => {
    gsap.to(".big-results .letter", {
      y: -8,
      duration: 0.5,
      stagger: 0.03,
      ease: "back.out(1.6)"
    });
  });
document
  .querySelector(".big-results-wrap")
  .addEventListener("mouseleave", () => {
    gsap.to(".big-results .letter", {
      y: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: "elastic.out(1, 0.6)"
    });
  });
