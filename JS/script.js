// JavaScript para funcionalidade do carrinho
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart--total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.card--title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.card--price .price')[index].textContent.slice(2) // Remove "R$"
                ),
                quantity: 1
            };

            const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;
            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span> (${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">R$${(item.price * item.quantity).toFixed(2)}
                    <button class="remove-btn" data-index="${index}">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </span>
            `;
            cartItemsList.append(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.closest('button').dataset.index;
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removeItem = cartItems[index];
        totalAmount -= removeItem.price * removeItem.quantity;
        cartItems.splice(index, 1);
        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `R$${totalAmount.toFixed(2)}`;
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});
