function renderProductCard(product) {
    const card = document.createElement('article');

    card.className = 'product-card';
    card.dataset.productId = String(product.id);

    card.innerHTML = `
        ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}

        <button
            class="heart-btn"
            aria-label="Add ${product.title} to wishlist"
        >
            <i class="fa-regular fa-heart"></i>
        </button>

        <img
            src="${product.image}"
            alt="${product.title}"
            class="prod-img"
            loading="lazy"
        >

        <div class="prod-info">
            <p class="category">${product.category}</p>

            <h3>${product.title}</h3>

            <div class="prod-footer">
                <span class="price">
                    $${Number(product.price).toFixed(2)}
                </span>

                <button class="add-btn">
                    Add
                </button>
            </div>
        </div>
    `;

    /* ==========================================
       WISHLIST
    ========================================== */

    const heartBtn = card.querySelector('.heart-btn');
    const icon = heartBtn.querySelector('i');

    // Show saved state if product is already saved
    if (
        window.KivoWishlist &&
        window.KivoWishlist.has(product.id)
    ) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');

        heartBtn.classList.add('active');

        heartBtn.setAttribute(
            'aria-label',
            `Remove ${product.title} from wishlist`
        );
    }

    // Heart click
    heartBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (!window.KivoWishlist) {
            console.error('KIVO Wishlist system is not loaded.');
            return;
        }

        if (window.KivoWishlist.has(product.id)) {

            // REMOVE
            window.KivoWishlist.remove(product.id);

            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');

            heartBtn.classList.remove('active');

            heartBtn.setAttribute(
                'aria-label',
                `Add ${product.title} to wishlist`
            );

        } else {

            // ADD
            window.KivoWishlist.add(product.id);

            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');

            heartBtn.classList.add('active');

            heartBtn.setAttribute(
                'aria-label',
                `Remove ${product.title} from wishlist`
            );
        }
    });

    /* ==========================================
       ADD TO CART
    ========================================== */

    const addBtn = card.querySelector('.add-btn');

    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (!window.KivoCart) {
            console.error('KIVO Cart system is not loaded.');
            return;
        }

        window.KivoCart.add(product);

        addBtn.textContent = 'Added ✓';

        setTimeout(() => {
            addBtn.textContent = 'Add';
        }, 1200);
    });

    /* ==========================================
       PRODUCT PAGE
    ========================================== */

    card.addEventListener('click', (e) => {

        if (
            e.target.closest('.heart-btn') ||
            e.target.closest('.add-btn')
        ) {
            return;
        }

        window.location.href =
            `product.html?id=${product.id}`;
    });

    return card;
}

document.addEventListener('DOMContentLoaded', () => {

    const newArrivals = document.getElementById('newArrivalsGrid');
    const bestSellers = document.getElementById('bestSellersGrid');

    // NEW ARRIVALS
    if (newArrivals) {
        products
            .filter(product =>
                product.badge &&
                product.badge.toLowerCase().includes('new')
            )
            .slice(0, 6)
            .forEach(product => {
                newArrivals.appendChild(
                    renderProductCard(product)
                );
            });
    }

    // BEST SELLERS
    if (bestSellers) {
        products
            .filter(product =>
                product.badge &&
                product.badge.toLowerCase().includes('best')
            )
            .slice(3, 6)
            .forEach(product => {
                bestSellers.appendChild(
                    renderProductCard(product)
                );
            });
    }

});
