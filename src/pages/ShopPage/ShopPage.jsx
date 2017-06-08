import React, { Component } from 'react';
import './ShopPage.css';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import ProductList from '../../components/ProductList/ProductList';
import shopsAPI from '../../utils/shopsAPI';
import orderService from '../../utils/orderService';

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopName: props.match.params.name,
      shop: {},
      products: []
    }
  }

  addItemToCart = (itemIdx) => {
    orderService.addItemToCart(this.state.products[itemIdx], this.state.shop).then(() => {
      this.props.handleCartUpdate();
    });
  }

  componentDidMount() {
    let self = this;
    shopsAPI.index()
      .then(shops => {
        const thisShop = shops.find(shop => shop.name === this.state.shopName);
        self.setState({
          shop: thisShop,
          products: thisShop.products
        })
      })
      .catch(err => {
        // handle the error gracefully
      });
  }

  render() {
    return (
      <div className='ShopPage'>
        <Navbar
          customer={this.props.customer}
          handleLogout={this.props.handleLogout}
        />
        <Header shopName={this.state.shopName} />
        <ProductList products={this.state.products} addItemToCart={this.addItemToCart} />
      </div>
    )
  }
}

export default ShopPage;