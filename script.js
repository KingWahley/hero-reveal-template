const REVEAL_CONFIG = {
  end: '+=180%',
  splitMovePercent: 45,
  contentFadeStart: 0.12,
  itemRevealStart: 0.18,
  itemStagger: 0.08,
};

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector('.split-reveal');
  const panel = document.querySelector('.split-reveal__panel');
  const topHalf = document.querySelector('.split-reveal__word-part--top');
  const bottomHalf = document.querySelector('.split-reveal__word-part--bottom');
  const heroContent = document.querySelector('.split-reveal__content');
  const heroItems = document.querySelectorAll('.hero-reveal-item');

  if (section && panel) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: REVEAL_CONFIG.end,
        scrub: true,
        pin: true,
      },
    });

    tl.fromTo(
      panel,
      {
        clipPath:
          'polygon(0 0, 100% 0, 100% 50%, 0 50%, 0 50%, 100% 50%, 100% 100%, 0 100%)',
      },
      {
        clipPath:
          'polygon(0 0, 100% 0, 100% 0%, 0 0%, 0 100%, 100% 100%, 100% 100%, 0 100%)',
        ease: 'none',
        duration: 1,
      },
      0
    );

    if (topHalf && bottomHalf) {
      tl.fromTo(topHalf, { yPercent: 0 }, { yPercent: -REVEAL_CONFIG.splitMovePercent, ease: 'none' }, 0);
      tl.fromTo(bottomHalf, { yPercent: 0 }, { yPercent: REVEAL_CONFIG.splitMovePercent, ease: 'none' }, 0);
    }

    if (heroContent) {
      tl.fromTo(
        heroContent,
        { autoAlpha: 0.2 },
        { autoAlpha: 1, ease: 'none', duration: 0.35 },
        REVEAL_CONFIG.contentFadeStart
      );
    }

    if (heroItems.length) {
      tl.fromTo(
        heroItems,
        { autoAlpha: 0, y: 44, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: REVEAL_CONFIG.itemStagger,
          ease: 'none',
          duration: 0.55,
        },
        REVEAL_CONFIG.itemRevealStart
      );
    }
  }
}
