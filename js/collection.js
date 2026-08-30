// collections.js — Editorial Collections Behavior

const collectionsData = [
    {
        title: "NEW SEASON",
        subtitle: "Fresh Arrivals & Studio Notes",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        link: "shop.html?collection=new-season"
    },
    {
        title: "ESSENTIALS",
        subtitle: "Timeless daily silhouettes",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
        link: "shop.html?collection=essentials"
    },
    {
        title: "EVENING",
        subtitle: "Structured tailoring & dark romance",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
        link: "shop.html?collection=evening"
    },
    {
        title: "STREETWEAR",
        subtitle: "Effortless independent layers",
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
        link: "shop.html?collection=streetwear"
    },
    {
        title: "ACCESSORIES",
        subtitle: "Hand-assembled artisan jewelry",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        link: "shop.html?cat=accessories"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Profile Drawer Toggles
    const profileDrawer = document.getElementById('profileDrawer');
    const openProfileBtn = document.getElementById('open-profile');
    const closeProfileBtn = document.getElementById('close-profile');

    if (openProfileBtn && profileDrawer) {
        openProfileBtn.addEventListener('click', () => profileDrawer.classList.add('open'));
    }
    if (closeProfileBtn && profileDrawer) {
        closeProfileBtn.addEventListener('click', () => profileDrawer.classList.remove('open'));
    }

    // Render Editorial Collections
    const editorialGrid = document.getElementById('editorialGrid');

    if (editorialGrid) {
        collectionsData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'editorial-card';

            card.innerHTML = `
                <div class="editorial-img-container">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="editorial-overlay">
                    <span class="editorial-sub">${item.subtitle}</span>
                    <h2>${item.title}</h2>
                    <span class="explore-link">Explore Collection &rarr;</span>
                </div>
            `;

            card.addEventListener('click', () => {
                window.location.href = item.link;
            });

            editorialGrid.appendChild(card);
        });
    }
});