import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './ShoppingCarts.module.css';
import CartPage from '../../components/CartPage';

function ShoppingCarts() {
  // Define your list of football-related items with additional information
  const [footballItems, setFootballItems] = useState([
    {
      id: 1,
      name: 'Football Jersey',
      price: 29.99,
      image: '/images/football-jersey.jfif',
      rating: 4.5,
      favorite: false,
    },
    {
      id: 2,
      name: 'Football Shoes',
      price: 49.99,
      image: '/images/football-shoes.jfif',
      rating: 4.2,
      favorite: false,
    },
    {
      id: 3,
      name: 'Football',
      price: 19.99,
      image: '/images/football.jfif',
      rating: 4.0,
      favorite: false,
    },
    // Add more items as needed
  ]);

  // State to manage the cart
  const [cart, setCart] = useState([]);
  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState('');

  // State to manage whether the cart page is open
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to toggle the cart page
  const toggleCartPage = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Function to toggle the favorite status of an item
  const toggleFavorite = (item) => {
    const updatedFootballItems = [...footballItems];
    updatedFootballItems[item.id - 1] = {
      ...updatedFootballItems[item.id - 1],
      favorite: !item.favorite,
    };
    setFootballItems(updatedFootballItems);
  };

  // Filter items based on the search query
  const filteredItems = footballItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className={styles.topBar}>
        <div className={styles.iconContainer}>
          <span
            role="img"
            aria-label="Search"
            onClick={() => setSearchQuery('')}
          >
            🔍
          </span>
        </div>
        <div className={styles.iconContainer}>
          <span role="img" aria-label="Cart" onClick={toggleCartPage}>
            🛒
          </span>
          <span className={styles.cartCount}>{cart.length}</span>
        </div>
        <div className={styles.iconContainer}>
          <span role="img" aria-label="Favorites" onClick={toggleFavorite}>
            ❤️
          </span>
        </div>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.productList}>
        <h1>Football Items</h1>
        <ul className={styles.productList}>
          {filteredItems.map((item) => (
            <li key={item.id} className={styles.productItem}>
              <div className={styles.productImage}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className={styles.productInfo}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <div className={styles.productRating}>
                  <span>Rating: {item.rating}</span>
                </div>
                <div className={styles.productActions}>
                  <button
                    onClick={() => addToCart(item)}
                    className={styles.cartButton}
                  >
                    {cart.includes(item) ? 'In Cart' : 'Add to Cart'}
                  </button>
                  <button
  onClick={() => toggleFavorite(item)}
  className={
    item.favorite
      ? styles.favoriteButtonActive
      : styles.favoriteButton
  }
>
  ❤️
</button>

                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isCartOpen && (
        <CartPage selectedItems={cart} setCart={setCart} />
      )}
    </div>
  );
}

export default ShoppingCarts;
