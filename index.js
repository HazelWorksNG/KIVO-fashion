/* ==========================================   KIVO — SCROLL REVEAL + STAGGER========================================== */
document.addEventListener('DOMContentLoaded', () => {

    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-image, .reveal-card'
    );

    if (!revealElements.length) return;

    console.log('Reveal elements found:', revealElements.length);

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                // Handle staggered animations for cards
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
            threshold: 0.05,
            rootMargin: '0px 0px -30px 0px'
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const announcements = document.querySelectorAll(
        '#announcementTrack span'
    );

    if (!announcements.length) return;

    let current = 0;

    announcements[current].classList.add('active');

    setInterval(() => {
        const previous = current;

        current = (current + 1) % announcements.length;

        announcements[previous].classList.remove('active');
        announcements[previous].classList.add('exit');

        announcements[current].classList.add('active');

        setTimeout(() => {
            announcements[previous].classList.remove('exit');
        }, 500);

    }, 3500);
});