document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get('id'));

    const product = products.find(item => item.id === productId);

    if (!product) {
        document.body.innerHTML = `
            <main class="product-not-found">
                <h1>Product not found</h1>
                <p>Sorry, we couldn't find that product.</p>
                <a href="shop.html">Back to Shop</a>
            </main>
        `;
        return;
    }

    // Product elements
    const image = document.getElementById('productImage');
    const title = document.getElementById('productTitle');
    const category = document.getElementById('productCategory');
    const price = document.getElementById('productPrice');
    const description = document.getElementById('productDescription');

    // Populate product
    image.src = product.image;
    image.alt = product.title;

    title.textContent = product.title;

    category.textContent = product.category;

    price.textContent = `$${Number(product.price).toFixed(2)}`;

    description.textContent =
        product.description || 'No description available.';


    // ==========================================
    // QUANTITY
    // ==========================================

    let quantity = 1;

    const quantityDisplay = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');

    decreaseBtn.addEventListener('click', () => {

        if (quantity > 1) {
            quantity--;

            quantityDisplay.textContent = quantity;
        }

    });

    increaseBtn.addEventListener('click', () => {

        quantity++;

        quantityDisplay.textContent = quantity;

    });


    // ==========================================
    // ADD TO CART
    // ==========================================

    const addToCartBtn = document.getElementById('addToCart');

    addToCartBtn.addEventListener('click', () => {

        if (!window.KivoCart) {
            console.error(
                'KIVO Cart system is not loaded.'
            );
            return;
        }

        // Add the product currently being viewed
        window.KivoCart.add(product, quantity);

        // Button feedback
        addToCartBtn.textContent = 'Added ✓';

        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
        }, 1200);

    });
});

function goBack() {
    window.history.back();
}