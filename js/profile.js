document.addEventListener('DOMContentLoaded', () => {

    function updateProfileStats() {
        /* =========================
           WISHLIST
        ========================== */
        const wishlist = JSON.parse(
            localStorage.getItem('KIVO_WISHLIST')
        ) || [];

        const wishlistCount = wishlist.length;

        const profileWishlistCount =
            document.getElementById('profileWishlistCount');

        const profileFavCount =
            document.getElementById('profileFavCount');

        if (profileWishlistCount) {
            profileWishlistCount.textContent = wishlistCount;
        }

        if (profileFavCount) {
            profileFavCount.textContent = wishlistCount;
        }

        /* =========================
           CART
        ========================== */
        const cart = JSON.parse(
            localStorage.getItem('kivoCart')
        ) || [];

        const cartCount = cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 1),
            0
        );

        const profileCartCount =
            document.getElementById('profileCartCount');

        if (profileCartCount) {
            profileCartCount.textContent = cartCount;
        }
    }

    updateProfileStats();
});