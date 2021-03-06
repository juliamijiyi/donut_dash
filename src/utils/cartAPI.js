import tokenService from './tokenService';
const BASE_URL = '/api/cart/';

function addItemToCart(item) {
  return fetch(BASE_URL + 'additemtocart', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(item)
  })
  .then(res => res.json())
  .then(({token}) => token);
}

function clearCart(item) {
  return fetch(BASE_URL + 'clearcart', {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }),
    body: JSON.stringify(item)
  })
  .then(res => res.json())
  .then(({token}) => token);
}

export default {
  addItemToCart,
  clearCart
}