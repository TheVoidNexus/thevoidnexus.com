const interactiveCard = document.getElementById('interactive-card');
        let canCreateTrailDot = true;
        const trailDotCooldown = 1;

        if (interactiveCard) {
            interactiveCard.addEventListener('mousemove', function(e) {
                if (!canCreateTrailDot) return;

                const rect = interactiveCard.getBoundingClientRect();
                const cardStyles = window.getComputedStyle(interactiveCard);
                const paddingLeft = parseFloat(cardStyles.paddingLeft);
                const paddingTop = parseFloat(cardStyles.paddingTop);

                const x = e.clientX - rect.left - paddingLeft + 32;
                const y = e.clientY - rect.top - paddingTop + 15;

                const trailDot = document.createElement('span');
                trailDot.classList.add('cursor-trail-dot');
                trailDot.style.left = `${x}px`;
                trailDot.style.top = `${y}px`;

                interactiveCard.appendChild(trailDot);

                trailDot.addEventListener('animationend', () => {
                    trailDot.remove();
                });

                canCreateTrailDot = false;
                setTimeout(() => {
                    canCreateTrailDot = true;
                }, trailDotCooldown);
            });
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const elementsToAnimate = document.querySelectorAll('.fade-in-element');
        elementsToAnimate.forEach(el => observer.observe(el));




//

  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    let scrollTimeout;

    function updateHashOnScroll() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        let currentSectionId = '';
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const visibleThreshold = Math.min(100, sectionHeight * 0.25);

          if (scrollPosition >= sectionTop - visibleThreshold &&
              scrollPosition < sectionTop + sectionHeight - visibleThreshold) {
            currentSectionId = section.id;
          }
        });

        if (!currentSectionId && sections.length > 0 && scrollPosition < sections[0].offsetTop) {
          if (sections[0].id === 'hero' || scrollPosition < windowHeight / 3) {
            if (sections[0].id) {
              currentSectionId = sections[0].id;
            }
          }
        }

        if (currentSectionId && window.location.hash !== `#${currentSectionId}`) {
          history.replaceState(null, null, `#${currentSectionId}`);
        } else if (!currentSectionId && window.location.hash) {
          history.replaceState(null, null, window.location.pathname + window.location.search);
        }
      }, 100);
    }

    window.addEventListener('scroll', updateHashOnScroll);
    updateHashOnScroll();
  });