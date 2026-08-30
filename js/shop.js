// ==========================================
// KIVO SHOP.JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    const productGrid = document.getElementById('product-grid');
    const sortSelect = document.getElementById('sortSelect');

    const toggleFilters = document.getElementById('toggleFilters');
    const closeFilters = document.getElementById('closeFilters');
    const filtersSidebar = document.getElementById('filtersSidebar');

    const applyFiltersBtn = document.querySelector('.apply-filters-btn');

    const priceRange = document.getElementById('priceRange');
    const maxPriceLabel = document.getElementById('maxPriceLabel');

    // Search input elements (supporting both standard search inputs and dedicated search bars)
    const searchInputs = document.querySelectorAll('input[type="search"], .search-input, #searchInput');

    // ------------------------------------------
    // SETTINGS
    // ------------------------------------------

    const INITIAL_PRODUCT_LIMIT = 20;

    let showAllProducts = false;
    let currentProducts = [...products];
    let currentSearchQuery = '';

    // ------------------------------------------
    // FILTER DRAWER
    // ------------------------------------------

    if (toggleFilters && filtersSidebar) {
        toggleFilters.addEventListener('click', () => {
            filtersSidebar.classList.add('active');
        });
    }

    if (closeFilters && filtersSidebar) {
        closeFilters.addEventListener('click', () => {
            filtersSidebar.classList.remove('active');
        });
    }

    // ------------------------------------------
    // PRICE RANGE
    // ------------------------------------------

    if (priceRange && maxPriceLabel) {
        priceRange.addEventListener('input', () => {
            maxPriceLabel.textContent = `$${priceRange.value}`;
        });
    }

    // ------------------------------------------
    // LIVE SEARCH FUNCTIONALITY
    // ------------------------------------------

    function handleSearch(query) {
        currentSearchQuery = query.toLowerCase().trim();
        applyAllFilters();
    }

    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            handleSearch(e.target.value);
        });
        
        // Also listen for enter key or form submission if inside a form
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch(e.target.value);
            }
        });
    });

    // ------------------------------------------
    // COMBINED FILTER PROCESSOR
    // ------------------------------------------

    function applyAllFilters() {
        // Get selected categories from sidebar if applicable
        const selectedCategories = Array.from(
            document.querySelectorAll('input[name="cat"]:checked')
        ).map(input => input.value.toLowerCase());

        const maxPrice = priceRange ? Number(priceRange.value) : Infinity;

        currentProducts = products.filter(product => {
            // Category check
            const categoryMatches =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category.toLowerCase());

            // Price check
            const priceMatches = Number(product.price) <= maxPrice;

            // Search query check (title, category, or description match)
            const searchMatches =
                !currentSearchQuery ||
                (product.title && product.title.toLowerCase().includes(currentSearchQuery)) ||
                (product.category && product.category.toLowerCase().includes(currentSearchQuery)) ||
                (product.description && product.description.toLowerCase().includes(currentSearchQuery));

            return categoryMatches && priceMatches && searchMatches;
        });

        showAllProducts = false;
        renderProducts(currentProducts);
    }

    // ------------------------------------------
    // PRODUCT CARD
    // ------------------------------------------

    function createProductCard(product) {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.dataset.productId = String(product.id);

        card.innerHTML = `
            ${product.badge
                ? `<span class="product-badge">${product.badge}</span>`
                : ''
            }

            <button class="heart-btn" aria-label="Add ${product.title} to wishlist">
                <i class="fa-regular fa-heart"></i>
            </button>

            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>

            <div class="product-info">
                <span class="product-cat">
                    ${product.category}
                </span>

                <h4>${product.title}</h4>

                <div class="product-footer">
                    <span class="product-price">
                        $${Number(product.price).toFixed(2)}
                    </span>

                    <button class="add-btn">
                        Add
                    </button>
                </div>
            </div>
        `;

        // Product click navigation
        card.addEventListener('click', (e) => {
            if (e.target.closest('.heart-btn') || e.target.closest('.add-btn')) {
                return;
            }
            window.location.href = `product.html?id=${product.id}`;
        });

        // ------------------------------------------
        // WISHLIST
        // ------------------------------------------
        const heartBtn = card.querySelector('.heart-btn');
        const icon = heartBtn.querySelector('i');

        // Show saved state
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

        heartBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (!window.KivoWishlist) {
                console.error('KIVO Wishlist system is not loaded.');
                return;
            }

            const saved =
                window.KivoWishlist.has(product.id);

            if (saved) {
                window.KivoWishlist.remove(product.id);

                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');

                heartBtn.classList.remove('active');

                heartBtn.setAttribute(
                    'aria-label',
                    `Add ${product.title} to wishlist`
                );
            } else {
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

        // Add to cart feedback
        const addBtn = card.querySelector('.add-btn');
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (window.KivoCart) {
                window.KivoCart.add(product);
            }

            addBtn.textContent = 'Added ✓';

            setTimeout(() => {
                addBtn.textContent = 'Add';
            }, 1200);
        });

        return card;
    }

    // ------------------------------------------
    // RENDER PRODUCTS
    // ------------------------------------------

    function renderProducts(items) {
        if (!productGrid) return;

        productGrid.innerHTML = '';

        if (items.length === 0) {
            productGrid.innerHTML = `
                <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
                    <h3>No products found</h3>
                    <p style="color: var(--muted); margin-top: 8px;">
                        Try adjusting your search query, category filters, or price range.
                    </p>
                </div>
            `;
            updateViewAllButton(0);
            return;
        }

        const productsToShow = showAllProducts
            ? items
            : items.slice(0, INITIAL_PRODUCT_LIMIT);

        productsToShow.forEach(product => {
            productGrid.appendChild(createProductCard(product));
        });

        updateViewAllButton(items.length);
    }

    // ------------------------------------------
    // VIEW ALL BUTTON
    // ------------------------------------------

    function updateViewAllButton(totalProducts) {
        let button = document.getElementById('viewAllProducts');

        if (!button) {
            button = document.createElement('button');
            button.id = 'viewAllProducts';
            button.className = 'view-all-btn';
            productGrid.parentElement.appendChild(button);
        }

        if (totalProducts <= INITIAL_PRODUCT_LIMIT) {
            button.style.display = 'none';
            return;
        }

        button.style.display = 'block';
        button.textContent = showAllProducts
            ? 'Show Less'
            : `View More`;
    }

    document.addEventListener('click', (e) => {
        if (e.target.id !== 'viewAllProducts') return;
        showAllProducts = !showAllProducts;
        renderProducts(currentProducts);
    });

    // ------------------------------------------
    // SORTING
    // ------------------------------------------

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const value = sortSelect.value;

            currentProducts.sort((a, b) => {
                if (value === 'low-high') return a.price - b.price;
                if (value === 'high-low') return b.price - a.price;
                if (value === 'newest') return b.id - a.id;
                return 0;
            });

            showAllProducts = false;
            renderProducts(currentProducts);
        });
    }

    // ------------------------------------------
    // SIDEBAR APPLY FILTERS
    // ------------------------------------------

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            applyAllFilters();
            if (filtersSidebar) {
                filtersSidebar.classList.remove('active');
            }
        });
    }

    // ------------------------------------------
    // URL CATEGORY / SEARCH PARAMS INITIALIZATION
    // ------------------------------------------

    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get('cat');
    const urlSearch = params.get('search');

    if (urlSearch) {
        currentSearchQuery = urlSearch.toLowerCase().trim();
        searchInputs.forEach(input => input.value = urlSearch);
    }

    if (urlCategory) {
        currentProducts = products.filter(product =>
            product.category.toLowerCase() === urlCategory.toLowerCase()
        );
    }

    applyAllFilters();

});