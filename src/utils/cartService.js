import cartAPI from './cartAPI';
import tokenService from './tokenService';

function addItemToCart(item, shop) {
  item.shopName = shop.name;
  item.shopCity = shop.city;
  return cartAPI.addItemToCart(item)
    .then(token => tokenService.setToken(token));
}

function clearCart(item, shop) {
  return cartAPI.clearCart(item)
    .then(token => tokenService.setToken(token));
}

export default {
  addItemToCart,
  clearCart
};