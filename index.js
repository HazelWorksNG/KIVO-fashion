/* ==========================================
   KIVO — SCROLL REVEAL + STAGGER
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-image, .reveal-card'
    );

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                // Stagger cards
                if (element.classList.contains('reveal-card')) {

                    const cards = [
                        ...element.parentElement.querySelectorAll('.reveal-card')
                    ];

                    const index = cards.indexOf(element);

                    element.style.setProperty(
                        '--stagger-delay',
                        `${index * 100}ms`
                    );
                }

                element.classList.add('visible');

                observer.unobserve(element);
            });

        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

});