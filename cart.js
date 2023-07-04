let cart = [];

export function addToCart(product, quantity = 1) {
  const existingCartItem = cart.find((item) => item.product.id === product.id);
  if (existingCartItem) {
    existingCartItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
}

export function removeCartItem(product) {
  cart = cart.filter((item) => item.product.id !== product.id);
}

export function clearCart() {
  cart = [];
}

export function calculateCartTotal() {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function getCartItems() {
  return cart;
}
