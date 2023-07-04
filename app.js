import { products } from './product.js';
import { addToCart, removeCartItem, clearCart, calculateCartTotal, getCartItems } from './cart.js';

const productListElement = document.getElementById('product-list');
const cartItemsElement = document.getElementById('cart-items');
const clearCartButton = document.getElementById('clear-cart');

function displayProducts() {
  products.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productListElement.appendChild(productElement);
  });
}

function attachAddToCartListeners() {
  const addToCartButtons = document.getElementsByClassName('add-to-cart');
  Array.from(addToCartButtons).forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      const product = products.find((p) => p.id === parseInt(productId));
      addToCart(product);
      displayCartItems();
    });
  });
}

function displayCartItems() {
  cartItemsElement.innerHTML = '';
  const cartItems = getCartItems();

  cartItems.forEach((cartItem) => {
    const { product, quantity } = cartItem;
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
      <p>${product.name} (Quantity: ${quantity})</p>
      <p>Price: $${product.price * quantity}</p>
      <button class="remove-from-cart" data-id="${product.id}">Remove</button>
    `;
    cartItemsElement.appendChild(cartItemElement);
  });

  const cartTotal = calculateCartTotal();
  const cartTotalElement = document.createElement('div');
  cartTotalElement.classList.add('cart-total');
  cartTotalElement.innerHTML = `Total: $${cartTotal}`;
  cartItemsElement.appendChild(cartTotalElement);

  attachRemoveFromCartListeners();
}

function attachRemoveFromCartListeners() {
  const removeFromCartButtons = document.getElementsByClassName('remove-from-cart');
  Array.from(removeFromCartButtons).forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      const product = products.find((p) => p.id === parseInt(productId));
      removeCartItem(product);
      displayCartItems();
    });
  });
}

function attachClearCartListener() {
  clearCartButton.addEventListener('click', () => {
    clearCart();
    displayCartItems();
  });
}

function initializeApp() {
  displayProducts();
  attachAddToCartListeners();
  attachClearCartListener();
}

initializeApp();
