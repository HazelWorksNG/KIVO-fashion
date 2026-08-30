/* =========================================================
   KIVO CART SYSTEM
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const CART_KEY = 'kivoCart';
    /* =====================================================
       ELEMENTS
    ===================================================== */

    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const openCartBtn = document.getElementById('open-cart');
    const closeCartBtn = document.getElementById('closeCart');
    const cartBody = document.getElementById('cartBody');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    const cartCount = document.getElementById('cart-count');
    const cartItemLabel = document.getElementById('cartItemLabel');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const continueShopping = document.getElementById('continueShopping');
    const checkoutBtn = document.getElementById('checkoutBtn');

    /* =====================================================
       STORAGE
    ===================================================== */

    function getCart() {

        try {
            const saved =
                localStorage.getItem(CART_KEY);

            if (!saved) {
                return [];
            }

            const parsed =
                JSON.parse(saved);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                'KIVO: Could not read cart.',
                error
            );

            return [];

        }

    }


    function saveCart(cart) {

        try {

            localStorage.setItem(
                CART_KEY,
                JSON.stringify(cart)
            );

        } catch (error) {

            console.error(
                'KIVO: Could not save cart.',
                error
            );

        }

    }

    /* =====================================================
       FORMAT MONEY
    ===================================================== */

    function formatMoney(amount) {

        return `$${Number(amount).toFixed(2)}`;

    }

    /* =====================================================
       ADD TO CART
    ===================================================== */

    function add(product, quantity = 1) {

        if (!product || product.id === undefined) {

            console.error(
                'KIVO: Invalid product passed to cart.',
                product
            );

            return;

        }


        const cart = getCart();

        const productId = Number(product.id);


        const existing =
            cart.find(
                item =>
                    Number(item.id) === productId
            );


        if (existing) {

            existing.quantity =
                Number(existing.quantity || 1)
                + Number(quantity);

        } else {

            cart.push({
                id: productId,
                title: product.title,
                price: Number(product.price),
                image: product.image,
                quantity: Number(quantity)
            });
        }
        saveCart(cart);
        renderCart();
        updateCartCount();
        open();

    }

    /* =====================================================
       REMOVE
    ===================================================== */

    function remove(productId) {
        const id = Number(productId);
        const cart = getCart();
        const updated =
            cart.filter(
                item =>
                    Number(item.id) !== id
            );

        saveCart(updated);
        renderCart();
        updateCartCount();
    }


    /* =====================================================
       INCREASE QUANTITY
    ===================================================== */

    function increase(productId) {

        const id =
            Number(productId);

        const cart =
            getCart();

        const item =
            cart.find(
                product =>
                    Number(product.id) === id
            );

        if (!item) {
            return;
        }

        item.quantity =
            Number(item.quantity || 1) + 1;

        saveCart(cart);

        renderCart();

        updateCartCount();

    }

    /* =====================================================
       DECREASE QUANTITY
    ===================================================== */

    function decrease(productId) {

        const id =
            Number(productId);

        const cart =
            getCart();

        const item =
            cart.find(
                product =>
                    Number(product.id) === id
            );

        if (!item) {
            return;
        }


        if (Number(item.quantity) <= 1) {

            remove(id);

            return;

        }


        item.quantity--;

        saveCart(cart);

        renderCart();

        updateCartCount();

    }

    /* =====================================================
       CLEAR CART
    ===================================================== */

    function clear() {

        saveCart([]);

        renderCart();

        updateCartCount();

    }

    /* =====================================================
       TOTAL NUMBER OF ITEMS
    ===================================================== */

    function count() {

        return getCart().reduce(
            (total, item) =>
                total + Number(item.quantity || 1),
            0
        );

    }

    /* =====================================================
       SUBTOTAL
    ===================================================== */

    function total() {

        return getCart().reduce(
            (sum, item) =>
                sum +
                (
                    Number(item.price) *
                    Number(item.quantity || 1)
                ),
            0
        );

    }
    /* =====================================================
       UPDATE HEADER BADGE
    ===================================================== */

    function updateCartCount() {

        if (!cartCount) {
            return;
        }

        const itemCount =
            count();

        cartCount.textContent =
            itemCount;

        cartCount.hidden =
            itemCount === 0;

    }

    /* =====================================================
       RENDER CART
    ===================================================== */

    function renderCart() {

        if (!cartBody) {
            return;
        }


        const cart =
            getCart();


        /* -----------------------------------------------
           EMPTY CART
        ------------------------------------------------ */

        if (cart.length === 0) {

            if (cartEmpty) {
                cartEmpty.hidden = false;
            }

            if (cartFooter) {
                cartFooter.hidden = true;
            }

            /*
               Remove any generated items.
            */

            cartBody
                .querySelectorAll('.cart-item')
                .forEach(item => item.remove());

            updateCartSummary();

            return;

        }


        /* -----------------------------------------------
           CART HAS PRODUCTS
        ------------------------------------------------ */

        if (cartEmpty) {
            cartEmpty.hidden = true;
        }

        if (cartFooter) {
            cartFooter.hidden = false;
        }


        /*
           Remove old generated items
           before rendering fresh ones.
        */

        cartBody
            .querySelectorAll('.cart-item')
            .forEach(item => item.remove());


        cart.forEach(product => {

            const item =
                createCartItem(product);

            cartBody.appendChild(item);

        });


        updateCartSummary();

    }


    /* =====================================================
       CREATE CART ITEM
    ===================================================== */

    function createCartItem(product) {

        const item =
            document.createElement('article');

        item.className =
            'cart-item';

        item.dataset.productId =
            product.id;


        item.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                    loading="lazy"
                >

            </div>


            <div class="cart-item-info">

                <h3>
                    ${product.title}
                </h3>

                <span class="cart-item-price">
                    ${formatMoney(product.price)}
                </span>


                <div class="cart-item-bottom">

                    <div class="cart-quantity">

                        <button
                            type="button"
                            class="qty-minus"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <span>
                            ${product.quantity}
                        </span>

                        <button
                            type="button"
                            class="qty-plus"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>


                    <button
                        type="button"
                        class="remove-cart-item"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;


        /* =================================================
           QUANTITY BUTTONS
        ================================================= */

        const minusBtn =
            item.querySelector('.qty-minus');

        const plusBtn =
            item.querySelector('.qty-plus');

        const removeBtn =
            item.querySelector('.remove-cart-item');


        minusBtn.addEventListener(
            'click',
            () => {

                decrease(product.id);

            }
        );

        plusBtn.addEventListener(
            'click',
            () => {

                increase(product.id);

            }
        );


        removeBtn.addEventListener(
            'click',
            () => {

                remove(product.id);

            }
        );


        return item;

    }

    /* =====================================================
       UPDATE SUMMARY
    ===================================================== */

    function updateCartSummary() {

        const itemCount =
            count();

        const subtotal =
            total();


        if (cartItemLabel) {

            cartItemLabel.textContent =
                `${itemCount} ${
                    itemCount === 1
                        ? 'item'
                        : 'items'
                }`;

        }
        if (cartSubtotal) {

            cartSubtotal.textContent =
                formatMoney(subtotal);

        }

    }

    /* =====================================================
       OPEN DRAWER
    ===================================================== */

    function open() {

        if (!cartDrawer) {
            return;
        }

        cartDrawer.classList.add('open');

        if (cartOverlay) {
            cartOverlay.classList.add('open');
        }

        cartDrawer.setAttribute(
            'aria-hidden',
            'false'
        );

        document.body.classList.add(
            'cart-open'
        );

    }

    /* =====================================================
       CLOSE DRAWER
    ===================================================== */

    function close() {

        if (!cartDrawer) {
            return;
        }

        cartDrawer.classList.remove('open');

        if (cartOverlay) {
            cartOverlay.classList.remove('open');
        }

        cartDrawer.setAttribute(
            'aria-hidden',
            'true'
        );

        document.body.classList.remove(
            'cart-open'
        );

    }

    /* =====================================================
       TOGGLE
    ===================================================== */

    function toggle() {
        if (
            cartDrawer &&
            cartDrawer.classList.contains('open')
        ) {

            close();

        } else {

            open();

        }

    }

    /* =====================================================
       EVENTS
    ===================================================== */

    if (openCartBtn) {

        openCartBtn.addEventListener(
            'click',
            toggle
        );

    }

    if (closeCartBtn) {

        closeCartBtn.addEventListener(
            'click',
            close
        );

    }

    if (cartOverlay) {

        cartOverlay.addEventListener(
            'click',
            close
        );

    }

    if (continueShopping) {

        continueShopping.addEventListener(
            'click',
            close
        );

    }

    /* Escape key closes drawer */

    document.addEventListener(
        'keydown',
        event => {
            if (event.key === 'Escape') {
                close();
            }
        }
    );

    /* =====================================================
       CHECKOUT
    ===================================================== */

    if (checkoutBtn) {

        checkoutBtn.addEventListener(
            'click',
            () => {

                const cart =
                    getCart();

                if (cart.length === 0) {
                    return;
                }

                /*
                   We'll create checkout.html next.
                */

                window.location.href =
                    'checkout.html';

            }
        );

    }


    /* =====================================================
       PUBLIC KIVO CART API
    ===================================================== */

    window.KivoCart = {
        get: getCart,
        add,
        remove,
        increase,
        decrease,
        clear,
        count,
        total,
        open,
        close,
        toggle,
        refresh: renderCart
    };


    /* =====================================================
       INITIALIZE
    ===================================================== */
    renderCart();
    updateCartCount();
});