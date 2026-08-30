/* =========================================================
   KIVO — WISHLIST
   Handles:
   - Saving products
   - Removing products
   - Rendering wishlist.html
   - Wishlist count
   - Add to Bag
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */
    const wishlistGrid = document.getElementById('wishlistProducts');
    const emptyState = document.getElementById('wishlistEmpty');
    const wishlistCount = document.getElementById('wishlistCount');
    const favCount = document.getElementById('fav-count');
    /* =====================================================
       STORAGE
    ===================================================== */

    const WISHLIST_KEY = 'KIVO_WISHLIST';

    function getWishlist() {
        return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    }

    function saveWishlist(wishlist) {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }

    /* =====================================================
       NORMALIZE PRODUCT IDS
    ===================================================== */

    function normalizeIds(ids) {

        return [
            ...new Set(
                ids
                    .map(id => Number(id))
                    .filter(id => Number.isFinite(id))
            )
        ];

    }


    /* =====================================================
       ADD PRODUCT TO WISHLIST
    ===================================================== */

    function addToWishlist(productId) {

        const wishlist =
            getWishlist();

        const id =
            Number(productId);

        if (!wishlist.includes(id)) {

            wishlist.push(id);

            saveWishlist(wishlist);

        }

        updateWishlistCount();

        return wishlist;

    }


    /* =====================================================
       REMOVE PRODUCT FROM WISHLIST
    ===================================================== */

    function removeFromWishlist(productId) {

        const id =
            Number(productId);

        const wishlist =
            getWishlist();

        const updatedWishlist =
            wishlist.filter(
                savedId => Number(savedId) !== id
            );

        saveWishlist(updatedWishlist);

        updateWishlistCount();

        return updatedWishlist;

    }

    /* =====================================================
       CHECK IF PRODUCT IS SAVED
    ==================================================== */

    function isInWishlist(productId) {

        const id =
            Number(productId);

        return getWishlist()
            .some(savedId => Number(savedId) === id);

    }


    /* =====================================================
       UPDATE HEADER COUNT
    ===================================================== */
    function updateWishlistCount() {

        const count =
            getWishlist().length;

        if (favCount) {

            favCount.textContent =
                count;

            favCount.hidden =
                count === 0;

        }

        if (wishlistCount) {

            wishlistCount.textContent =
                `${count} ${count === 1 ? 'item' : 'items'}`;

        }

    }

    /* =====================================================
       GET PRODUCTS
    ===================================================== */
    function getSavedProducts() {

        if (
            typeof products === 'undefined' ||
            !Array.isArray(products)
        ) {

            console.error(
                'KIVO: products array was not found.'
            );

            return [];

        }

        const wishlist =
            normalizeIds(getWishlist());

        /*
           Remove IDs that no longer exist
           in products.js.
        */

        const validIds =
            wishlist.filter(id =>
                products.some(
                    product =>
                        Number(product.id) === id
                )
            );

        /*
           Keep localStorage clean.
        */

        if (
            validIds.length !== wishlist.length
        ) {

            saveWishlist(validIds);

        }

        /*
           Preserve wishlist order.
        */

        return validIds
            .map(id =>
                products.find(
                    product =>
                        Number(product.id) === id
                )
            )
            .filter(Boolean);

    }

    /* =====================================================
       RENDER WISHLIST
    ===================================================== */
    function renderWishlist() {

        if (!wishlistGrid) {
            return;
        }

        const savedProducts =
            getSavedProducts();

        updateWishlistCount();


        /* -----------------------------------------------
           EMPTY STATE
        ------------------------------------------------ */

        if (savedProducts.length === 0) {

            wishlistGrid.innerHTML = '';

            if (emptyState) {

                emptyState.hidden = false;

            }

            return;

        }


        /* -----------------------------------------------
           PRODUCTS EXIST
        ------------------------------------------------ */

        if (emptyState) {

            emptyState.hidden = true;

        }


        wishlistGrid.innerHTML = '';


        savedProducts.forEach(product => {

            const card =
                createWishlistCard(product);

            wishlistGrid.appendChild(card);

        });

    }

    /* =====================================================
       CREATE WISHLIST CARD
    ===================================================== */

    function createWishlistCard(product) {

        const card =
            document.createElement('article');

        card.className =
            'product-card';

        card.dataset.productId =
            product.id;


        /*
           Badge
        */

        const badgeHTML =
            product.badge
                ? `
                    <span class="product-badge">
                        ${product.badge}
                    </span>
                  `
                : '';


        card.innerHTML = `

            <div class="product-img-wrapper">

                ${badgeHTML}

                <img
                    src="${product.image}"
                    alt="${product.title}"
                    loading="lazy"
                >

                <button
                    type="button"
                    class="wishlist-remove-btn"
                    aria-label="Remove ${product.title} from wishlist"
                    title="Remove from wishlist"
                >
                    <i class="fa-solid fa-heart"></i>
                </button>

            </div>


            <div class="product-info">

                <span class="product-cat">
                    ${product.category || 'KIVO'}
                </span>

                <h3 class="product-title">
                    ${product.title}
                </h3>


                <div class="product-footer">

                    <span class="product-price">
                        $${Number(product.price).toFixed(2)}
                    </span>

                    <button
                        type="button"
                        class="wishlist-add-btn"
                    >
                        Add to Bag
                    </button>

                </div>

            </div>

        `;


        /* =================================================
           REMOVE BUTTON
        ================================================= */

        const removeBtn =
            card.querySelector(
                '.wishlist-remove-btn'
            );

        removeBtn.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                removeFromWishlist(product.id);

                renderWishlist();

            }
        );


        /* =================================================
           ADD TO BAG
        ================================================= */

        const addBtn =
            card.querySelector(
                '.wishlist-add-btn'
            );

        addBtn.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                addProductToCart(product);

            }
        );


        /* =================================================
           OPEN PRODUCT PAGE
        ================================================= */

        card.addEventListener(
            'click',
            event => {

                if (
                    event.target.closest(
                        '.wishlist-remove-btn'
                    ) ||
                    event.target.closest(
                        '.wishlist-add-btn'
                    )
                ) {

                    return;

                }

                window.location.href =
                    `product.html?id=${product.id}`;

            }
        );


        return card;

    }

    /* =====================================================
       UPDATE CART COUNT
    ===================================================== */
    function updateCartCount(cart = null) {

        const cartCount =
            document.getElementById(
                'cart-count'
            );

        if (!cartCount) {
            return;
        }

        if (!cart) {

            try {

                const saved =
                    localStorage.getItem(
                        'kivoCart'
                    );

                cart =
                    saved
                        ? JSON.parse(saved)
                        : [];

            } catch {

                cart = [];

            }

        }

        const totalQuantity =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(item.quantity || 1),
                0
            );
        cartCount.textContent = totalQuantity;
        cartCount.hidden =totalQuantity === 0;
    }
    /* =====================================================
       ADD TO BAG FEEDBACK
    ===================================================== */
    function showAddedFeedback(product) {

        /*
           Find the currently visible card.
        */
        const card =
            document.querySelector(
                `.product-card[data-product-id="${product.id}"]`
            );
        if (!card) {
            return;
        }
        const button =
            card.querySelector(
                '.wishlist-add-btn'
            );

        if (!button) {
            return;
        }


        const originalText = button.textContent;
        button.textContent = 'Added ✓';
        button.disabled = true;
    }

    /* =====================================================
       SYNC HEART BUTTONS ON OTHER PAGES
    ===================================================== */

    function syncWishlistButtons() {

        const wishlist =
            getWishlist();


        /*
           Works with your existing
           .heart-btn elements.
        */

        document
            .querySelectorAll('.heart-btn')
            .forEach(button => {

                /*
                   Try to find the product ID
                   from the card.
                */

                const card =
                    button.closest(
                        '.product-card'
                    );

                if (!card) {
                    return;
                }


                const productId =
                    card.dataset.productId;


                if (!productId) {
                    return;
                }


                const icon =
                    button.querySelector('i');


                if (
                    wishlist.includes(
                        Number(productId)
                    )
                ) {

                    button.classList.add(
                        'active'
                    );

                    if (icon) {

                        icon.classList.remove(
                            'fa-regular'
                        );

                        icon.classList.add(
                            'fa-solid'
                        );

                    }

                } else {

                    button.classList.remove(
                        'active'
                    );

                    if (icon) {

                        icon.classList.remove(
                            'fa-solid'
                        );

                        icon.classList.add(
                            'fa-regular'
                        );

                    }

                }

            });

    }

    /* =====================================================
       PUBLIC API
       Allows other KIVO scripts to use the wishlist.
    ===================================================== */

    window.KivoWishlist = {
        get: getWishlist,
        add: addToWishlist,
        remove: removeFromWishlist,
        has: isInWishlist,
        count: () => getWishlist().length,
        refresh: renderWishlist,
        sync: syncWishlistButtons
    };


    /* =====================================================
    INITIALIZE
    ===================================================== */
    renderWishlist();
    updateCartCount();
    syncWishlistButtons();
    updateWishlistCount();

});
